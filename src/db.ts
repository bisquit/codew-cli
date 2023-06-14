import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { codewHomeDir } from './config';

export type Workspace = { path: string; workspace: string };
export type Data = {
  workspaces: Workspace[];
};

const defaultData: Data = { workspaces: [] };
const adapter = new JSONFile<Data>(`${codewHomeDir}/db.json`);

async function getDb() {
  const db = new Low<Data>(adapter, defaultData);
  await db.read();
  return db;
}

export async function readWorkspaces(): Promise<ReadonlyArray<Workspace>> {
  const db = await getDb();
  return db.data.workspaces;
}

export async function insertWorkspace(workspace: Workspace) {
  const db = await getDb();
  db.data.workspaces.push(workspace);
  await db.write();
}

export async function dropWorkspaces() {
  const db = await getDb();
  db.data.workspaces = [];
  await db.write();
}
