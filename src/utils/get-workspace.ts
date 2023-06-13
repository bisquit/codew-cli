import { resolve } from 'node:path';

import { db } from '../db';
import { createFileComponents } from './file-components';
export function getWorkspace(path: string): string | undefined {
  const { filepath } = createFileComponents(resolve(process.cwd(), path));

  const workspace = db.data.workspaces.find(
    (w) => w.path === filepath
  )?.workspace;

  return workspace;
}
