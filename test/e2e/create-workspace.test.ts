import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { createWorkspace } from '../../src/usecases/create-workspace';

const mocks = vi.hoisted(() => {
  return {
    testHomedir: () => resolve('e2e-tmp-home'),
  };
});

beforeEach(async () => {
  if (existsSync(mocks.testHomedir())) {
    await rm(mocks.testHomedir(), { recursive: true });
  }
  await mkdir(mocks.testHomedir());

  vi.mock('node:os', () => {
    return {
      homedir: () => mocks.testHomedir(),
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('createWorkspace', async () => {
  await createWorkspace('dir-1');

  const workspaceFileContent = await readFile(
    resolve(mocks.testHomedir(), '.codew/workspaces/dir-1.code-workspace'),
    {
      encoding: 'utf-8',
    }
  );
  const workspaceFile = JSON.parse(workspaceFileContent);
  expect(workspaceFile.folders.length).toBe(1);
  expect(workspaceFile.folders.at(0).path).toBe(
    resolve(process.cwd(), 'dir-1')
  );

  const dbContent = await readFile(
    resolve(mocks.testHomedir(), '.codew/db.json'),
    {
      encoding: 'utf-8',
    }
  );
  const db = JSON.parse(dbContent);
  expect(db.workspaces.length).toBe(1);
  expect(db.workspaces.at(0).path).toBe(resolve(process.cwd(), 'dir-1'));
  expect(db.workspaces.at(0).workspace).toBe(
    resolve(mocks.testHomedir(), '.codew/workspaces/dir-1.code-workspace')
  );
});
