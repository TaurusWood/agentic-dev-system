import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('../', import.meta.url));
const promptsDir = join(rootDir, 'prompts');
const canonicalRefs = [
  'skills/agentic-development/references/workflow.md',
  'skills/agentic-development/references/stage-contracts.md',
  'skills/agentic-development/references/freeze-output.md',
  'skills/agentic-development/references/prompt-composition.md',
];
const errors = [];

for (const relativePath of canonicalRefs) {
  try {
    await readFile(join(rootDir, relativePath), 'utf8');
  } catch {
    errors.push(`missing canonical runtime reference: ${relativePath}`);
  }
}

const files = (await readdir(promptsDir)).filter((name) => name.endsWith('.md'));
for (const name of files) {
  const text = await readFile(join(promptsDir, name), 'utf8');

  if (!text.includes('Canonical authority:')) {
    errors.push(`${name}: missing canonical authority marker`);
  }

  const forbidden = [
    '## Role Contract',
    '**Owns:**',
    '**May change:**',
    '**Must preserve:**',
    '**Must not do:**',
    '**Must stop when:**',
  ];

  for (const marker of forbidden) {
    if (text.includes(marker)) {
      errors.push(`${name}: redefines canonical stage semantics via ${marker}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Protocol drift check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Protocol drift check passed (${files.length} prompt adapters checked).`);
}
