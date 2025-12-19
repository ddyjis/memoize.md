import * as path from "node:path";

import {sha256} from "js-sha256";

import type {DerivedCard, FrontMatter} from "@/types/card";

import type {ParsedFile} from "./parser";

export function generateCards(parsedFile: ParsedFile): DerivedCard[] {
  const {config, content, filePath} = parsedFile;

  // Decide Mode
  if (config.list) {
    return generateListCards(content, filePath);
  }
  return generateConceptCards(config, content, filePath);
}

function generateListCards(content: string, filePath: string): DerivedCard[] {
  const cards: DerivedCard[] = [];
  const source_filepath = filePath;

  // Split, Filter empty, Deduplicate
  let lines = content.split("\n").filter((line) => line.trim() !== "");
  lines = [...new Set(lines)]; // Deduplicate

  for (const line of lines) {
    if (!line.includes("::")) continue;

    const parts = line.split("::");
    if (parts.length < 2) continue;

    const front = parts[0].trim();
    const back = parts.slice(1).join("::").trim();

    if (!front || !back) continue;

    // Use whole line for anchor as requested
    const anchor = sha256(line.trim());

    cards.push({
      source_filepath,
      card_anchor: anchor,
      card_type: "basic",
      front,
      back,
      tags: [], // List mode currently does not support tags from frontmatter
    });
  }

  return cards;
}

function generateConceptCards(
  config: FrontMatter,
  content: string,
  filePath: string,
): DerivedCard[] {
  const cards: DerivedCard[] = [];
  const source_filepath = filePath;

  // Mode A: Concept Mode (Default)
  const filename = path.basename(filePath);
  const anchor = filename;

  let front: string | undefined;
  let back: string | undefined;

  // 1. Check for custom front/back separator (---)
  const separatorRegex = /\n-{3,}\n/;
  const match = content.match(separatorRegex);

  if (match && match.index !== undefined) {
    front = content.substring(0, match.index).trim();
    back = content.substring(match.index + match[0].length).trim();

    // If user explicitly used separator but left front empty,
    // we can either leave it empty or fallback to filename.
    // Given the user's focus on "custom syntax", let's respect the empty front
    // (or they might use it for a "Back-only" card?).
    // But for safety/sanity let's default to filename ONLY if strictly empty string?
    if (!front) front = filename;
  } else {
    // 2. No separator? Check for Cloze
    const hasCloze = /==.*?==/.test(content);
    if (hasCloze) {
      // Treat as Cloze Card: Front contains the full context (with clozes)
      // Back also contains full context (will show answer)
      front = content;
      back = content;
    }
  }

  // 3. Validation: Must have either Separator OR Cloze
  if (front === undefined || back === undefined) {
    throw new Error(
      `Invalid card format in "${filename}": Must contain '---' separator or '==...==' cloze deletion.`,
    );
  }

  cards.push({
    source_filepath,
    card_anchor: anchor,
    card_type: "basic",
    front,
    back,
    tags: config.tags,
  });

  if (config.reverse) {
    // Reverse only makes sense if we have a distinct Front/Back (Separator mode)
    // If it's a Cloze card (Front==Back), Reverse is redundant/invalid.
    // We only generate reverse if explicitly requested AND it's not a "same-sided" card?
    // Or just let user shoot foot? The PRD says "If reverse: true...".
    // I will allow it, but it might produce a duplicate card if Front==Back.
    // Let's add a check to avoid duplicate content if Front === Back.
    if (front !== back) {
      cards.push({
        source_filepath,
        card_anchor: anchor,
        card_type: "reverse",
        front: back,
        back: front,
        tags: config.tags,
      });
    }
  }

  return cards;
}
