import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { codewHome } from './config';

type Workspace = { path: string; workspace: string };
type Data = {
  workspaces: Workspace[];
};

const defaultData: Data = { workspaces: [] };
const adapter = new JSONFile<Data>(`${codewHome}/db.json`);
const db = new Low<Data>(adapter, defaultData);

await db.read();

export async function getWorkspaces(): Promise<Workspace[]> {
  return db.data.workspaces;
}

export async function createWorkspace(workspace: Workspace) {
  db.data.workspaces.push(workspace);
  await db.write();
}
