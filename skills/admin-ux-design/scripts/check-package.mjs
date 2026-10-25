import { readFile, readdir, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const required = [
  'SKILL.md',
  'references/principles.md',
  'references/patterns.md',
  'references/interaction-contract.md',
  'references/prototype-handoff.md',
  'references/sources.md',
  'templates/interaction-contract.yaml',
  'examples/review-list.md',
  'evaluations/README.md',
  'evaluations/scenarios.json',
];

const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const stringList = value => Array.isArray(value) && value.length > 0 && value.every(nonempty);
const outside = (root, target) => {
  const rel = relative(root, target);
  return rel === '..' || rel.startsWith('../') || rel.startsWith('..\\') || isAbsolute(rel);
};

// Structural checks for this authored package, not a generic YAML parser or UX evaluator.
export async function checkPackage(directory = defaultRoot) {
  const root = resolve(directory);
  const errors = [];
  const text = new Map();
  for (const name of required) {
    try { text.set(name, await readFile(resolve(root, name), 'utf8')); }
    catch { errors.push(`missing or unreadable package file: ${name}`); }
  }

  const skill = text.get('SKILL.md') ?? '';
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) errors.push('SKILL.md: missing YAML frontmatter');
  else {
    if (!/^name: admin-ux-design\s*$/m.test(frontmatter)) errors.push('SKILL.md: incorrect skill name');
    const description = frontmatter.match(/^description: (.+)$/m)?.[1];
    if (!nonempty(description) || description.length > 1024) errors.push('SKILL.md: invalid single-line description');
  }

  const patterns = text.get('references/patterns.md') ?? '';
  for (const id of ['A', 'B', 'C', 'D', 'E', 'F']) {
    if (!new RegExp(`^## ${id} — `, 'm').test(patterns)) errors.push(`patterns: missing section ${id}`);
  }

  const sources = text.get('references/sources.md') ?? '';
  const knownSources = new Set([...sources.matchAll(/^\| (S\d+) \|/gm)].map(match => match[1]));
  if (!knownSources.size) errors.push('sources: no source registry');

  async function scan(directoryPath) {
    let entries;
    try { entries = await readdir(directoryPath, { withFileTypes: true }); }
    catch { errors.push(`unreadable directory: ${relative(root, directoryPath) || '.'}`); return; }
    for (const entry of entries) {
      const path = resolve(directoryPath, entry.name);
      if (entry.isSymbolicLink()) { errors.push(`symlink not supported in package: ${relative(root, path)}`); continue; }
      if (entry.isDirectory()) await scan(path);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const name = relative(root, path);
        const body = await readFile(path, 'utf8');
        // This package deliberately uses simple inline Markdown links.
        for (const match of body.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)\)/g)) {
          const href = match[1];
          if (/^https:\/\//.test(href)) {
            try { new URL(href); } catch { errors.push(`${name}: invalid URL ${href}`); }
            continue;
          }
          if (href.startsWith('#')) continue;
          let target;
          try { target = resolve(directoryPath, decodeURIComponent(href.split('#')[0])); }
          catch { errors.push(`${name}: invalid link ${href}`); continue; }
          if (outside(root, target)) { errors.push(`${name}: link escapes installed package: ${href}`); continue; }
          try { if (!(await stat(target)).isFile()) errors.push(`${name}: link is not a file: ${href}`); }
          catch { errors.push(`${name}: broken local link: ${href}`); }
        }
        if (name.replaceAll('\\', '/') !== 'references/sources.md') {
          for (const match of body.matchAll(/\bS\d+\b/g)) {
            if (!knownSources.has(match[0])) errors.push(`${name}: unknown source ${match[0]}`);
          }
        }
      }
    }
  }
  await scan(root);

  const template = text.get('templates/interaction-contract.yaml') ?? '';
  if (!/^status: draft\s*$/m.test(template)) errors.push('template: must start as draft');
  if (!/^  production_authority: false\s*$/m.test(template)) errors.push('template: prototype must not have production authority');
  if (!/^  evidence: null\s*$/m.test(template)) errors.push('template: must not contain fabricated approval evidence');

  try {
    const data = JSON.parse(text.get('evaluations/scenarios.json') ?? 'null');
    if (!data || data.schema_version !== 1 || !nonempty(data.purpose) || !Array.isArray(data.cases) || !data.cases.length) {
      errors.push('evaluations: invalid scenario envelope');
    } else {
      const ids = new Set();
      for (const item of data.cases) {
        if (!item || !nonempty(item.id) || ids.has(item.id)) errors.push('evaluations: missing or duplicate scenario id');
        if (item) ids.add(item.id);
        if (!item || !nonempty(item.prompt) || !stringList(item.expected) || !stringList(item.must_not)) {
          errors.push(`evaluations: incomplete scenario ${item?.id ?? '<missing>'}`);
        }
      }
    }
  } catch { errors.push('evaluations: scenarios.json is invalid JSON'); }

  return [...new Set(errors)];
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const errors = await checkPackage(process.argv[2] ?? defaultRoot);
  if (errors.length) {
    console.error('Admin UX package check failed:\n' + errors.map(error => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Admin UX package check passed (structure, local links, source IDs, template guards, evaluation-case shape).');
    console.log('Not evaluated: UX quality, agent behavior, live browser interaction, or production isolation.');
  }
}
