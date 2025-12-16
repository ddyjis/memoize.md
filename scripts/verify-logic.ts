import * as fs from "node:fs/promises";
import * as path from "node:path";

import {generateCards} from "@/lib/sync/card-generator";
import {parseMarkdownFile} from "@/lib/sync/parser";

async function verify() {
  console.log("Verifying Sync Logic...");

  // 1. Create content
  const conceptContent = `---
reverse: true
search: false
---
# Concept Note

This is a concept note body.
`;

  const listContent = `---
list: true
---
Q2 :: A2
Q1 :: A1
Q1 :: A1
Invalid Line
Q3 :: A3 :: Extra
Q2 :: A2
`;

  const tempDir = "./temp-verify";
  await fs.mkdir(tempDir, {recursive: true});

  const conceptFile = path.join(tempDir, "Concept.md");
  const listFile = path.join(tempDir, "List.md");

  await fs.writeFile(conceptFile, conceptContent);
  await fs.writeFile(listFile, listContent);

  // 2. Process Concept
  console.log("\n--- Processing Concept Mode ---");
  const parsedConcept = await parseMarkdownFile(conceptFile);
  console.log("Parsed Config:", parsedConcept.config);
  const conceptCards = generateCards(parsedConcept);
  console.log(`Generated ${conceptCards.length} cards.`);
  conceptCards.forEach((c) => {
    console.log(`- Type: ${c.card_type}, Anchor: ${c.card_anchor}, Front: ${c.front}`);
  });

  // 3. Process List
  console.log("\n--- Processing List Mode ---");
  const parsedList = await parseMarkdownFile(listFile);
  console.log("Parsed Config:", parsedList.config);
  const listCards = generateCards(parsedList);
  console.log(`Generated ${listCards.length} cards.`);
  listCards.forEach((c) => {
    console.log(
      `- Type: ${c.card_type}, Anchor: ${c.card_anchor}, Front: ${c.front}, Back: ${c.back}`,
    );
  });

  // Cleanup
  await fs.rm(tempDir, {recursive: true, force: true});
  console.log("\nVerification Complete.");
}

verify().catch(console.error);
