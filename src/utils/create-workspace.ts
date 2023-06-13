import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { mkdirp } from 'mkdirp';

import { workspaceDir } from '../config';
import { insertWorkspace } from '../db';
import { createFileComponents } from './file-components';
import template from './template';

export async function createWorkspace(path: string) {
  const { filepath, filename } = createFileComponents(
    resolve(process.cwd(), path)
  );

  const data = template({ path: filepath });

  const workspacePath = `${workspaceDir}/${filename}.code-workspace`;

  await mkdirp(workspaceDir);
  await writeFile(workspacePath, data, {});

  await insertWorkspace({ path: filepath, workspace: workspacePath });

  return workspacePath;
}
