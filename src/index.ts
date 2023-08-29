#!/usr/bin/env node

import { log } from '@clack/prompts';
import { cli } from 'cleye';

import { description, version } from '../package.json';
import clean from './commands/clean.js';
import list from './commands/list.js';
import { checkDir } from './operations/check-dir.js';
import { createWorkspace } from './operations/create-workspace.js';
import { getWorkspace } from './operations/get-workspace.js';
import { openWorkspace } from './operations/open-workspace.js';
import { validateWorkspace } from './operations/validate-workspace.js';

cli(
  {
    name: 'codew',

    version: version,

    parameters: ['<path>'],

    flags: {},

    help: {
      description: description,
      examples: ['codew .'],
    },

    commands: [list, clean],
  },
  async (argv) => {
    const path = argv._.path;

    try {
      await checkDir(path);

      const workspace = await getWorkspace(path);

      if (workspace && (await validateWorkspace(workspace))) {
        await openWorkspace(workspace);
      } else {
        const workspace = await createWorkspace(path);
        await openWorkspace(workspace);
      }
    } catch (e) {
      log.error(`${e}`);
    }
  },
);
