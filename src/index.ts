#!/usr/bin/env node

import { log } from '@clack/prompts';
import { cli } from 'cleye';

import { description, version } from '../package.json';
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

    flags: {
      editor: {
        type: String,
        alias: 'e',
        default: 'code',
        description: 'Editor to use (code, antigravity, agy)',
      },
    },

    help: {
      description: description,
      examples: ['codew .'],
    },

    commands: [],
  },
  async (argv) => {
    const path = argv._.path;
    const editor = argv.flags.editor;

    try {
      await checkDir(path);

      const workspace = await getWorkspace(path);

      if (workspace && (await validateWorkspace(workspace))) {
        await openWorkspace(workspace, editor);
      } else {
        const workspace = await createWorkspace(path);
        await openWorkspace(workspace, editor);
      }
    } catch (e) {
      log.error(`${e}`);
    }
  },
);
