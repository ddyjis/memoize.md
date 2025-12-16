import * as fs from "node:fs/promises";

import matter from "gray-matter";
import {z} from "zod";

import type {FrontMatter} from "@/types/card";

const FrontMatterSchema = z.object({
  tags: z.array(z.string()).optional(),
  reverse: z.boolean().optional(),
  list: z.boolean().optional(),
});

export interface ParsedFile {
  filePath: string;
  config: FrontMatter;
  content: string;
}

export async function parseMarkdownFile(filePath: string): Promise<ParsedFile> {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const {data, content} = matter(fileContent);

  // Validate frontmatter
  const parseResult = FrontMatterSchema.safeParse(data);
  if (!parseResult.success) {
    console.warn(`Invalid frontmatter in ${filePath}:`, parseResult.error.format());
    // Fallback to empty config or throw?
    // For now, let's treat invalid config as default config to avoid crashing everything,
    // but log a warning. Or maybe throw to stop processing this file.
    // Let's fallback to default
  }

  const config = parseResult.success ? parseResult.data : {};

  return {filePath, config, content: content.trim()};
}
