#!/usr/bin/env node

import { log } from '@clack/prompts';
import { cli } from 'cleye';

import * as pkg from '../package.json';
import clean from './commands/clean';
import list from './commands/list';
import { checkDir } from './operations/check-dir';
import { createWorkspace } from './operations/create-workspace';
import { getWorkspace } from './operations/get-workspace';
import { openWorkspace } from './operations/open-workspace';
import { validateWorkspace } from './operations/validate-workspace';

cli(
  {
    name: 'codew',

    version: pkg.version,

    parameters: ['<path>'],

    flags: {},

    help: {
      description: pkg.description,
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
