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

    cards.push({source_filepath, card_anchor: anchor, card_type: "basic", front, back});
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
  const front = filename;
  const back = content;

  cards.push({source_filepath, card_anchor: anchor, card_type: "basic", front, back});

  if (config.reverse) {
    cards.push({
      source_filepath,
      card_anchor: anchor,
      card_type: "reverse",
      front: back,
      back: front,
    });
  }

  return cards;
}
