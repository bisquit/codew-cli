import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { openWorkspace } from '../../src/operations/open-workspace.js';

const spy = vi.fn();

beforeEach(() => {
  vi.mock('execa', () => {
    return {
      $: (...args: any) => {
        spy(args);
      },
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('openWorkspace with default editor (code)', async () => {
  await openWorkspace('.');
  expect(spy).toHaveBeenLastCalledWith([['', ' ', ''], 'code', '.']);
});

test('openWorkspace with antigravity editor', async () => {
  await openWorkspace('.', 'antigravity');
  expect(spy).toHaveBeenLastCalledWith([['', ' ', ''], 'antigravity', '.']);
});

test('openWorkspace with agy editor', async () => {
  await openWorkspace('.', 'agy');
  expect(spy).toHaveBeenLastCalledWith([['', ' ', ''], 'agy', '.']);
});
