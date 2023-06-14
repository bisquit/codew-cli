#!/usr/bin/env node

import { cli } from 'cleye';

import * as pkg from '../package.json';
import { createWorkspace } from './usecases/create-workspace';
import { openWorkspace } from './usecases/open-workspace';
import { getWorkspace } from './utils/get-workspace';

const argv = cli({
  name: 'codew',

  version: pkg.version,

  parameters: ['<path>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['codew .'],
  },
});

const path = argv._.path;

const workspace = await getWorkspace(path);
if (workspace) {
  await openWorkspace(workspace);
} else {
  const workspace = await createWorkspace(path);
  await openWorkspace(workspace);
}
