import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { mkdirp } from 'mkdirp';

import { workspaceDir } from '../config.js';
import { insertWorkspace } from '../db.js';
import { createFileComponents } from '../utils/file-components.js';
import { createWorkspaceTemplate } from '../utils/template.js';

export async function createWorkspace(
  dir: string,
  options?: { workspaceName?: string },
) {
  const { filepath, filename } = createFileComponents(
    resolve(process.cwd(), dir),
  );

  const data = createWorkspaceTemplate({ path: filepath });

  const workspacePath = `${workspaceDir}/${
    options?.workspaceName ?? filename
  }.code-workspace`;

  await mkdirp(workspaceDir);
  await writeFile(workspacePath, data, {});

  await insertWorkspace({
    dirPath: filepath,
    codeWorkspacePath: workspacePath,
  });

  return workspacePath;
}
