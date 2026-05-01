// scripts/hookResume.mjs
// Claude Code PostToolUse hook — called after every Edit/Write tool use.
// Reads the tool-use JSON from stdin, checks if resumeData.js was changed,
// and if so regenerates the LaTeX + PDF.

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Read stdin (Claude Code passes tool-use data as JSON)
let raw = '';
for await (const chunk of process.stdin) raw += chunk;

let filePath = '';
try {
  const data = JSON.parse(raw);
  filePath = data?.tool_input?.file_path || data?.tool_input?.path || '';
} catch { /* stdin may be empty in manual runs */ }

if (!filePath.includes('resumeData')) process.exit(0);

console.log('\n[resume-hook] resumeData.js changed — regenerating resume...');
try {
  execSync('node scripts/generateResume.mjs', {
    stdio: 'inherit',
    cwd: ROOT,
  });
} catch {
  // Error already printed by generateResume.mjs
  process.exit(1);
}
