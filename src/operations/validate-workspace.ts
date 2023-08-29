import { existsSync } from 'node:fs';

import { deleteWorkspace } from '../db.js';

/**
 * validateor
 * a. returns false if not a valid workspace there, and continue to subsquent steps
 * b. throw error if unexpected, and stop process
 *
 * also, it's do much though, some extra operations.
 */
export async function validateWorkspace(workspace: string): Promise<boolean> {
  // When user accidentally delete .code-workspace
  if (!existsSync(workspace)) {
    // delete from db and continue
    await deleteWorkspace(workspace);
    return false;
  }

  return true;
}
