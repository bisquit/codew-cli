import { cancel, confirm, isCancel, log, outro } from '@clack/prompts';
import { command } from 'cleye';
import colors from 'picocolors';

import { cleanWorkspaces } from '../operations/clean-workspaces';

export default command(
  {
    name: 'clean',

    help: {
      description: 'Clean all workspaces codew stored',
    },
  },
  async () => {
    try {
      const confirmed = await confirm({
        message: `Are you sure to clean all workspaces?`,
        initialValue: false,
      });
      if (!confirmed || isCancel(confirmed)) {
        cancel(`Cancelled`);
        process.exit(0);
      }

      await cleanWorkspaces();

      outro(colors.cyan('✔ Successfully cleaned.'));
      process.exit(0);
    } catch (e) {
      log.error(`${e}`);
    }
  },
);
