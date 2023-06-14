import { stat } from 'node:fs/promises';

export async function checkDir(path: string) {
  const stats = await stat(path).catch(() => {
    throw new Error('invalid path');
  });

  if (!stats.isDirectory()) {
    throw new Error('not a directory');
  }

  return true;
}
