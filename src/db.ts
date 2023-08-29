import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { codewHomeDir } from './config.js';

export type DbData = {
  workspaces: Workspace[];
};
export type Workspace = { dirPath: string; codeWorkspacePath: string };

const defaultData: DbData = { workspaces: [] };
const adapter = new JSONFile<DbData>(`${codewHomeDir}/db.json`);

async function getDb() {
  const db = new Low<DbData>(adapter, defaultData);
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

export async function deleteWorkspace(workspacePath: string) {
  const db = await getDb();
  db.data.workspaces = db.data.workspaces.filter(
    (v) => v.codeWorkspacePath !== workspacePath,
  );
  await db.write();
}

export async function dropWorkspaces() {
  const db = await getDb();
  db.data.workspaces = [];
  await db.write();
}
