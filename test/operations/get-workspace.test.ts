import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { createWorkspace } from '../../src/operations/create-workspace';
import { getWorkspace } from '../../src/operations/get-workspace';

const mocks = vi.hoisted(() => {
  return {
    testHomedir: () => resolve('test-tmp', basename(import.meta.url)),
  };
});

beforeEach(async () => {
  if (existsSync(mocks.testHomedir())) {
    await rm(mocks.testHomedir(), { recursive: true, force: true });
  }
  await mkdir(mocks.testHomedir(), { recursive: true });

  vi.mock('node:os', () => {
    return {
      homedir: () => mocks.testHomedir(),
    };
  });
});

afterEach(async () => {
  vi.restoreAllMocks();
});

test('getWorkspace', async () => {
  expect(await getWorkspace('dir-1')).toBeUndefined();

  await createWorkspace('dir-1');
  expect(await getWorkspace('dir-1')).toBe(
    resolve(mocks.testHomedir(), '.codew/workspaces/dir-1.code-workspace')
  );
});
