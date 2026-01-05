import { $ } from 'execa';

export type Editor = 'code' | 'antigravity' | 'agy';

export async function openWorkspace(workspacePath: string, editor: Editor = 'code') {
  await $`${editor} ${workspacePath}`;
}
