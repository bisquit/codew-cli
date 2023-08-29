import { rm } from 'node:fs/promises';

import { workspaceDir } from '../config.js';
import { dropWorkspaces } from '../db.js';

export async function cleanWorkspaces() {
  await rm(workspaceDir, { recursive: true, force: true });

  await dropWorkspaces();
}
