import { rm } from 'node:fs/promises';

import { workspaceDir } from '../config';
import { dropWorkspaces } from '../db';

export async function cleanWorkspaces() {
  await rm(workspaceDir, { recursive: true, force: true });

  await dropWorkspaces();
}
