import { readWorkspaces, Workspace } from '../db.js';
export async function getWorkspaces(): Promise<ReadonlyArray<Workspace>> {
  const workspaces = await readWorkspaces();

  return workspaces;
}
