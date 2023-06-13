import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import path from 'node:path';
import url from 'node:url';

import { $ } from 'execa';
import { mkdirp } from 'mkdirp';

import { createFileComponents } from './file-components';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export async function createWorkspace(path: string) {
  const { filepath, filename } = createFileComponents(
    resolve(process.cwd(), path)
  );

  const template = await readFile(resolve(__dirname, './template'), {
    encoding: 'utf-8',
  });

  const data = template.replace('__PATH__', filepath);

  const home = homedir();
  const workspaceDir = `${home}/.codew/workspaces`;
  const workspacePath = `${workspaceDir}/${filename}.code-workspace`;

  await mkdirp(workspaceDir);
  await writeFile(workspacePath, data, {});

  $`code ${workspacePath}`;
}
