# PRD: "Headless SRS" (Personal Anki Alternative)

**Version:** 1.0
**Date:** December 15, 2025
**Status:** Ready for Development

## Executive Summary

A personal, web-based Spaced Repetition System (SRS). It decouples **Content** (Markdown files in a
private GitHub repo) from **State** (FSRS data in Supabase). The system prioritizes a "Docs-as-Code"
workflow, where the user edits Markdown in Obsidian, pushes to GitHub, and reviews on a Next.js web
app.

## System Architecture

### High-Level Flow

1.  **Editor (Obsidian):** User creates/edits `.md` files locally.
2.  **Storage (GitHub):** User pushes changes to a private repository.
3.  **Sync Engine (GitHub Actions):** A Node.js script triggers on `push`. It parses Markdown,
    generates card objects, and performs a "Reconciliation" with the Database (Upsert/Suspend).
4.  **Database (Supabase):** Stores card metadata (Source, Anchor, Type) and FSRS learning state.
5.  **Client (Next.js):** Fetches due cards from Supabase, renders Markdown/Math, and handles the
    review loop.

### Tech Stack

*   **Frontend:** Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui.
*   **Backend/DB:** Supabase (PostgreSQL + Auth).
*   **Sync Script:** Node.js 22 (TypeScript) running in GitHub Actions.
*   **Algorithm:** `ts-fsrs` (v5.x).
*   **Markdown Engine:** `unified` ecosystem (`remark-parse`, `rehype-katex`, `gray-matter`).

## Data Model & Schema

### Uniqueness Strategy

A card is uniquely identified by the combination of three fields:

1.  **Source:** The file path (e.g., `Languages/French/Vocab.md`).
2.  **Anchor:** The logical ID within the file (Filename or Hash).
3.  **Type:** The variant (Basic, Reverse, Cloze).

### Database Schema (`cards` table)

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (System ID). |
| `user_id` | UUID | Foreign Key to Auth Users. |
| `source_filepath` | Text | **Identity Part 1**: Full path (e.g., `Tech/React.md`). |
| `card_anchor` | Text | **Identity Part 2**: Filename (Concept Mode) or Hash of Question (List Mode). |
| `card_type` | Text | **Identity Part 3**: `basic`, `reverse`, `cloze`. |
| `front` | Text | The Question content (Markdown). |
| `back` | Text | The Answer content (Markdown). |
| `state` | Int | FSRS State (0=New, 1=Learning, 2=Review, 3=Relearning). |
| `stability` | Float | FSRS Memory Stability. |
| `difficulty` | Float | FSRS Difficulty. |
| `elapsed_days` | Int | Days since last review. |
| `scheduled_days` | Int | Interval for next review. |
| `reps` | Int | Total repetition count. |
| `lapses` | Int | Total lapse count (forgotten). |
| `tags` | Text[] | Array of tags for filtering. |
| `due_date` | Timestamptz | Next scheduled review. |
| `last_review` | Timestamptz | Timestamp of the last rating. |
| `is_suspended` | Boolean | `true` if source file/line was deleted. |
| `created_at` | Timestamptz | Creation time. |
| `updated_at` | Timestamptz | Last content update time. |

*Constraint:* `UNIQUE(user_id, source_filepath, card_anchor, card_type)`

## Content Syntax (The Contract)

### Frontmatter Configuration

```ts
type FrontMatter = {
  tags?: string[];
  reverse?: boolean; // Default: false (Generate B->A cards?)
  list?: boolean;    // Default: false (Treat file as list of items?)
}
```

### Mode A: Concept Note (Default)

Best for technical concepts. One file = One logical unit.

*   **Anchor:** The Filename (e.g., `20231215.md`).
*   **Front:** Content before the `---` separator (excluding frontmatter).
*   **Back:** Content after the `---` separator.
*   **Validation:** If no `---` separator is found AND no cloze `==...==` is present, the card generation **MUST FAIL** (raise error). No fallback to filename.
*   **Cloze:** Supported via `==...==` syntax (Obsidian Highlight).
*   **Reverse:** If `reverse: true`, generates a second card (Back -> Front).

### Mode B: Vocab List (`list: true`)

Best for language learning. One file = Many cards.

*   **Anchor:** SHA-256 Hash of the Question text.
*   **Cloze:** **NOT Supported** (Per decision to reduce complexity).
*   **Syntax:**:  `Question :: Answer`

## The Sync Engine (GitHub Action)

### Logic

1.  **Trigger:** On `push` to `main`.
2.  **Parse:** Read all `.md` files. Generate a list of "Current Derived Cards".
3.  **Fetch:** Get all active cards from Supabase for the user.
4.  **Reconcile:**
    *   **Match:** If `(source, anchor, type)` exists in DB -> Update `front`, `back`, set
        `is_suspended = false`.
    *   **New:** If not in DB -> Insert with `state = 0` (New).
    *   **Missing:** If in DB but not in Parse -> Set `is_suspended = true` (Soft Delete).

## User Experience (Web App)

### Review Loop

1.  **Fetch:** Query `cards` where `due_date <= NOW()` AND `is_suspended = false`.
2.  **Render:**
    *   Render Markdown/LaTeX.
    *   If `cloze`, replace `==text==` with `[...]` (clickable to reveal).
3.  **Interaction:**
    *   **Show Answer:** Spacebar / Tap.
    *   **Rate:** 
        *   `1`: Again (Fail)
        *   `2`: Hard
        *   `3`: Good
        *   `4`: Easy

### Review Session & Syncing (Hybrid Batch Strategy)

To ensure performance and offline resilience while maintaining data integrity:

1.  **prefetch**: At session start, fetch a batch of due cards (e.g., 20-50) from Supabase.
2.  **Optimistic UI**: When a user rates a card:
    *   Update local state immediately (show next card).
    *   Push valid review to `pendingReviews` queue.
3.  **The "Undo" Buffer (5s)**:
    *   Hold the review in a temporary "buffer" state for 5 seconds.
    *   *Visual:* Toast "Rated Good [Undo]".
    *   *Interaction:* User can Undo (pop from stack, revert UI) within this window.
4.  **Commit to Queue**:
    *   After 5s (or if user advances multiple cards rapidly), move from "buffer" to "sync queue".
5.  **Background Sync**:
    *   Flush the "sync queue" to Supabase:
        *   **Periodically:** Every ~5 cards or ~30 seconds.
        *   **On Exit:** Try to flush remaining items when session ends.
    *   *Failure Handling:* If sync fails, keep items in queue and retry next time (persist in localStorage if possible).

### Mobile Considerations

*   **Sticky Footer:** 4 large, color-coded buttons.
*   **Gestures:** Tap body to flip.
*   **Responsive:** No sidebars during review; focus mode only.

### Media

*   **Constraint:** No internal media support (images in private repo cannot be served).
*   **Workaround:** Use external public URLs (Imgur/S3) if images are required.

## Implementation Roadmap

### Phase 1: Foundation (DB & Auth)

1.  **Setup Supabase Project.**
2.  **Apply SQL Schema (with `pgcrypto`).**
3.  **Configure RLS Policies.**

### Phase 2: The Brain (Sync Script)

1.  **Write `scripts/sync.ts`.**
2.  **Implement Parsing Logic (Frontmatter, Regex for separators).**
3.  **Implement Reconciliation Logic (Upsert/Suspend).**
4.  **Configure GitHub Actions Workflow.**

### Phase 3: The Client (Next.js)

1.  **Setup Next.js 16 + shadcn/ui.**
2.  **Build `ReviewSession` component.**
3.  **Integrate `ts-fsrs` for scheduling math.**
4.  **Implement Markdown/Math rendering.**

### Phase 4: Refinement

1.  **Implement the 5-second Undo Buffer.**
2.  **Add Mobile touch targets.**
3.  **Add "Last Synced" indicator.**
