import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { codewHome } from './config';

type Data = {
  workspaces: { path: string; workspace: string }[];
};

const defaultData: Data = { workspaces: [] };
const adapter = new JSONFile<Data>(`${codewHome}/db.json`);
const db = new Low<Data>(adapter, defaultData);

await db.read();

export { db };
