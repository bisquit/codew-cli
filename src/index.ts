#!/usr/bin/env node

import { cli } from 'cleye';

import * as pkg from '../package.json';
import { createWorkspace } from './usecases/create-workspace';

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
createWorkspace(path);
