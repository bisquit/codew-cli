import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { createWorkspace } from '../../src/operations/create-workspace';

const mocks = vi.hoisted(() => {
  return {
    testHomedir: () => resolve('e2e-tmp', basename(import.meta.url)),
  };
});

beforeEach(async () => {
  if (existsSync(mocks.testHomedir())) {
    await rm(mocks.testHomedir(), { recursive: true, force: true });
  }
  await mkdir(mocks.testHomedir());

  vi.mock('node:os', () => {
    return {
      homedir: () => mocks.testHomedir(),
    };
  });
});

afterEach(async () => {
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

  await createWorkspace('dir-2', { workspaceName: 'custom-dir-2' });

  const workspaceFileContent2 = await readFile(
    resolve(
      mocks.testHomedir(),
      '.codew/workspaces/custom-dir-2.code-workspace'
    ),
    {
      encoding: 'utf-8',
    }
  );
  const workspaceFile2 = JSON.parse(workspaceFileContent2);
  expect(workspaceFile2.folders.length).toBe(1);
  expect(workspaceFile2.folders.at(0).path).toBe(
    resolve(process.cwd(), 'dir-2')
  );
});
