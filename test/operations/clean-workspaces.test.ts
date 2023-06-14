import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { cleanWorkspaces } from '../../src/operations/clean-workspaces';
import { createWorkspace } from '../../src/operations/create-workspace';

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

test('cleanWorkspaces', async () => {
  await createWorkspace('dir-1');

  expect(
    existsSync(
      resolve(mocks.testHomedir(), '.codew/workspaces/dir-1.code-workspace')
    )
  ).toBe(true);
  const dbContent = await readFile(
    resolve(mocks.testHomedir(), '.codew/db.json'),
    {
      encoding: 'utf-8',
    }
  );
  const db = JSON.parse(dbContent);
  expect(db.workspaces.length).toBe(1);

  await cleanWorkspaces();

  expect(
    existsSync(
      resolve(mocks.testHomedir(), '.codew/workspaces/dir-1.code-workspace')
    )
  ).toBe(false);
  const dbContent2 = await readFile(
    resolve(mocks.testHomedir(), '.codew/db.json'),
    {
      encoding: 'utf-8',
    }
  );
  const db2 = JSON.parse(dbContent2);
  expect(db2.workspaces.length).toBe(0);
});
