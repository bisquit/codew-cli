import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { checkDir } from '../../src/operations/check-dir';

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

test('checkDir', async () => {
  await expect(() =>
    checkDir(resolve(mocks.testHomedir(), 'dir-1'))
  ).rejects.toThrowError('invalid');

  await mkdir(resolve(mocks.testHomedir(), 'dir-1'), { recursive: true });
  await writeFile(resolve(mocks.testHomedir(), 'file-1'), '');

  expect(await checkDir(resolve(mocks.testHomedir(), 'dir-1'))).toBe(true);

  await expect(() =>
    checkDir(resolve(mocks.testHomedir(), 'file-1'))
  ).rejects.toThrowError('not a directory');
});
