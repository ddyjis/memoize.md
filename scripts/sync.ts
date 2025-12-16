import * as dotenv from "dotenv";
import {glob} from "glob";

import {generateCards} from "@/lib/sync/card-generator";
import {fetchActiveCards, suspendCards, upsertCards} from "@/lib/sync/db";
import {parseMarkdownFile} from "@/lib/sync/parser";
import type {Card, DerivedCard, UpsertCard} from "@/types/card";

dotenv.config();

const USER_ID = process.env.USER_ID as string;

if (!USER_ID) {
  console.error("Error: USER_ID environment variable is not set.");
  process.exit(1);
}

async function main() {
  console.log("Starting sync...");

  // 1. Discovery
  const files = await glob("**/*.md", {
    ignore: ["node_modules/**", ".next/**", "dist/**", "memoizemd/**"],
    nodir: true,
  });
  console.log(`Found ${files.length} markdown files.`);

  const derivedCards: DerivedCard[] = [];

  // 2. Parse & Generate
  for (const file of files) {
    try {
      const parsed = await parseMarkdownFile(file);
      const cards = generateCards(parsed);
      derivedCards.push(...cards);
    } catch (error) {
      console.error(`Failed to process ${file}:`, error);
    }
  }
  console.log(`Generated ${derivedCards.length} derived cards.`);

  // 3. Fetch Active State
  const activeCards = await fetchActiveCards(USER_ID as string);
  console.log(`Fetched ${activeCards.length} active cards from DB.`);

  // 4. Reconciliation
  const upsertList: UpsertCard[] = [];
  const suspendList: string[] = [];

  // Map for O(1) lookup: key = "source|anchor|type"
  const activeCardMap = new Map<string, Card>();
  for (const card of activeCards) {
    const key = `${card.source_filepath}|${card.card_anchor}|${card.card_type}`;
    activeCardMap.set(key, card);
  }

  // Check Derived Cards
  for (const derived of derivedCards) {
    const key = `${derived.source_filepath}|${derived.card_anchor}|${derived.card_type}`;
    const existing = activeCardMap.get(key);

    if (existing) {
      // Check if content changed
      if (existing.front !== derived.front || existing.back !== derived.back) {
        upsertList.push({
          ...derived, // contains source, anchor, type, front, back
          user_id: USER_ID,
          is_suspended: false, // Ensure it's active
        });
      }
      // Remove from map to track what's missing
      activeCardMap.delete(key);
    } else {
      // New Card
      upsertList.push({...derived, user_id: USER_ID, is_suspended: false});
    }
  }

  // Remainders in Map are missing -> Suspend
  for (const card of activeCardMap.values()) {
    suspendList.push(card.id);
  }

  console.log(`Sync Summary:
  - New/Updated: ${upsertList.length}
  - Suspended: ${suspendList.length}
  - Unchanged: ${activeCards.length - suspendList.length - (upsertList.length - (derivedCards.length - activeCards.length + suspendList.length))} (Approx)`);

  // 5. Execute Updates
  if (upsertList.length > 0) {
    console.log("Upserting cards...");
    await upsertCards(upsertList);
  }

  if (suspendList.length > 0) {
    console.log("Suspending cards...");
    await suspendCards(suspendList);
  }

  console.log("Sync complete!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
