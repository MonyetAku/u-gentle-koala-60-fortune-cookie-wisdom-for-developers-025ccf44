// Fortune Cookie Wisdom for Developers — one original line.
// The program writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Gate: UTF-8 text, 1-120 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Git blame will one day point at you, and you will not remember writing a single line.";

// The gate refuses anything outside 1-120 characters, so check it here
// and fail loudly instead of shipping an invalid entry.
const MAX_CHARS = 120;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS || LINE.trim().length === 0) {
    throw new Error(`entry line is ${LINE.length} chars, outside the 1-120 gate`);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
