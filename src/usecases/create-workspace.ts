import { writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

import { $ } from 'execa';
import { mkdirp } from 'mkdirp';

import { createFileComponents } from './file-components';
import template from './template';

export async function createWorkspace(path: string) {
  const { filepath, filename } = createFileComponents(
    resolve(process.cwd(), path)
  );

  const data = template.replace('__PATH__', filepath);

  const home = homedir();
  const workspaceDir = `${home}/.codew/workspaces`;
  const workspacePath = `${workspaceDir}/${filename}.code-workspace`;

  await mkdirp(workspaceDir);
  await writeFile(workspacePath, data, {});

  $`code ${workspacePath}`;
}
