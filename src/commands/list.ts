import { command } from 'cleye';
import colors from 'picocolors';

import { getWorkspaces } from '../operations/get-workspaces';

export default command(
  {
    name: 'list',

    help: {
      description: 'List workspaces',
    },
  },
  async () => {
    const workspaces = await getWorkspaces();
    const msg = [
      `${colors.cyan('All workspaces')} (total: ${workspaces.length})`,
      ...workspaces.map(
        (w) => `${colors.white(w.workspace)} ${colors.dim(w.path)}`
      ),
    ].join('\n');
    console.log(msg);
  }
);
