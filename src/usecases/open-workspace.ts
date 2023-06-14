import { $ } from 'execa';

export async function openWorkspace(workspacePath: string) {
  await $`code ${workspacePath}`;
}
