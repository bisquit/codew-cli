import { resolve } from 'node:path';

import { readWorkspaces } from '../db.js';
import { createFileComponents } from '../utils/file-components.js';
export async function getWorkspace(dir: string): Promise<string | undefined> {
  const { filepath } = createFileComponents(resolve(process.cwd(), dir));

  const workspacePath = (await readWorkspaces()).find(
    (w) => w.dirPath === filepath,
  )?.codeWorkspacePath;

  if (!workspacePath) {
    return;
  }

  return workspacePath;
}
