import { $ } from 'execa';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { openWorkspace } from '../../src/usecases/open-workspace';

const spy = vi.fn();

beforeEach(() => {
  vi.mock('execa', () => {
    return {
      $: (...args: any) => {
        console.log('mocked $ ', args);
        spy(args);
      },
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('openWorkspace', async () => {
  await openWorkspace('.');
  expect(spy).toHaveBeenLastCalledWith([['code ', ''], '.']);
});