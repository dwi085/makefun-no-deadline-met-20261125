// One Line, No Deadline Met — entry program.
// Writes one single-line joke, an excuse for a missed deadline,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I approved my own extension in my head and forgot to cc the rest of the team.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = LINE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (/\r|\n/.test(text)) {
  throw new Error("entry must be a single line");
}
if (!/\S/.test(text)) {
  throw new Error("entry must not be only whitespace");
}

writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${text.length} characters to ${join(outDir, "entry.txt")}`);
