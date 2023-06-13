import { resolve } from 'node:path';

import * as db from '../db';
import { createFileComponents } from './file-components';
export async function getWorkspace(path: string): Promise<string | undefined> {
  const { filepath } = createFileComponents(resolve(process.cwd(), path));

  const workspace = (await db.getWorkspaces()).find(
    (w) => w.path === filepath
  )?.workspace;

  return workspace;
}
