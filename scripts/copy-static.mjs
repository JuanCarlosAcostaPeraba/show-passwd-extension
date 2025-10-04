import { mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const STATIC_ITEMS = [
  { source: 'extension', target: '.' },
  { source: 'assets', target: 'assets' }
];

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function copyDir(source, target) {
  await ensureDir(target);
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, targetPath);
    }
  }
}

async function main() {
  for (const item of STATIC_ITEMS) {
    const source = join(ROOT, item.source);
    try {
      const stats = await stat(source);
      if (!stats.isDirectory()) {
        continue;
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        continue;
      }
      throw error;
    }

    const target = join(DIST, item.target);
    await copyDir(source, target);
  }
}

main().catch((error) => {
  console.error('[copy-static]', error);
  process.exitCode = 1;
});
