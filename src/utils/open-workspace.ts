import { $ } from 'execa';

export async function openWorkspace(workspacePath: string) {
  $`code ${workspacePath}`;
}
