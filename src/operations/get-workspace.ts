import { resolve } from 'node:path';

import { readWorkspaces } from '../db';
import { createFileComponents } from '../utils/file-components';
export async function getWorkspace(dir: string): Promise<string | undefined> {
  const { filepath } = createFileComponents(resolve(process.cwd(), dir));

  const workspacePath = (await readWorkspaces()).find(
    (w) => w.path === filepath
  )?.workspace;

  return workspacePath;
}
