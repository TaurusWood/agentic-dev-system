import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { checkPackage } from '../skills/admin-ux-design/scripts/check-package.mjs';

const source = fileURLToPath(new URL('../skills/admin-ux-design/', import.meta.url));
async function withCopy(run) {
  const temporary = await mkdtemp(join(tmpdir(), 'admin-ux-package-'));
  const root = join(temporary, 'admin-ux-design');
  try { await cp(source, root, { recursive: true }); await run(root); }
  finally { await rm(temporary, { recursive: true, force: true }); }
}
async function edit(root, name, transform) {
  const path = join(root, name);
  await writeFile(path, transform(await readFile(path, 'utf8')));
}
async function expectError(root, pattern) {
  const errors = await checkPackage(root);
  assert.ok(errors.some(error => pattern.test(error)), `Expected ${pattern}; got ${JSON.stringify(errors)}`);
}

await test('package remains valid after copying outside the repository', () => withCopy(async root => {
  assert.deepEqual(await checkPackage(root), []);
}));
await test('missing reference is detected', () => withCopy(async root => {
  await rm(join(root, 'references/principles.md'));
  await expectError(root, /missing or unreadable.*principles/);
}));
await test('missing frontmatter is detected', () => withCopy(async root => {
  await edit(root, 'SKILL.md', text => text.replace(/^---[\s\S]*?\n---\n/, ''));
  await expectError(root, /missing YAML frontmatter/);
}));
await test('unscoped skill name is rejected', () => withCopy(async root => {
  await edit(root, 'SKILL.md', text => text.replace('name: admin-ux-design', 'name: ux-design'));
  await expectError(root, /incorrect skill name/);
}));
await test('missing discovery description is detected', () => withCopy(async root => {
  await edit(root, 'SKILL.md', text => text.replace(/^description:.*\n/m, ''));
  await expectError(root, /invalid single-line description/);
}));
await test('missing pattern is detected', () => withCopy(async root => {
  await edit(root, 'references/patterns.md', text => text.replace('## F — ', '## Removed — '));
  await expectError(root, /missing section F/);
}));
await test('broken local link is detected', () => withCopy(async root => {
  await edit(root, 'SKILL.md', text => text + '\n[Missing](references/missing.md)\n');
  await expectError(root, /broken local link/);
}));
await test('dependency on an unpackaged sibling is rejected', () => withCopy(async root => {
  await edit(root, 'SKILL.md', text => text + '\n[Sibling](../agentic-development/SKILL.md)\n');
  await expectError(root, /link escapes installed package/);
}));
await test('unknown source ID is detected', () => withCopy(async root => {
  await edit(root, 'references/principles.md', text => text + '\nSource: S999.\n');
  await expectError(root, /unknown source S999/);
}));
await test('template cannot silently become approved', () => withCopy(async root => {
  await edit(root, 'templates/interaction-contract.yaml', text => text.replace('status: draft', 'status: approved'));
  await expectError(root, /must start as draft/);
}));
await test('template cannot promote prototype authority', () => withCopy(async root => {
  await edit(root, 'templates/interaction-contract.yaml', text => text.replace('production_authority: false', 'production_authority: true'));
  await expectError(root, /must not have production authority/);
}));
await test('template cannot invent approval evidence', () => withCopy(async root => {
  await edit(root, 'templates/interaction-contract.yaml', text => text.replace('evidence: null', 'evidence: approved-by-agent'));
  await expectError(root, /fabricated approval evidence/);
}));
await test('malformed evaluation JSON is detected', () => withCopy(async root => {
  await writeFile(join(root, 'evaluations/scenarios.json'), '{');
  await expectError(root, /invalid JSON/);
}));
await test('duplicate evaluation cases are detected', () => withCopy(async root => {
  await edit(root, 'evaluations/scenarios.json', text => {
    const data = JSON.parse(text); data.cases.push(data.cases[0]); return JSON.stringify(data);
  });
  await expectError(root, /duplicate scenario id/);
}));
await test('evaluation expectations must be nonempty', () => withCopy(async root => {
  await edit(root, 'evaluations/scenarios.json', text => {
    const data = JSON.parse(text); data.cases[0].expected = []; return JSON.stringify(data);
  });
  await expectError(root, /incomplete scenario/);
}));
await test('symlinks are not silently followed outside the package', () => withCopy(async root => {
  await symlink('../outside', join(root, 'outside-reference'));
  await expectError(root, /symlink not supported/);
}));
