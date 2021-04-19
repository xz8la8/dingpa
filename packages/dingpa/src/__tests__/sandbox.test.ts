import { createSandbox } from '../sandbox';

test('snapshot', () => {
  const win = {} as any;
  const sandbox = createSandbox('snapshoot');
  sandbox.proxy = win;

  sandbox.active();

  win.a = 1;
  expect(win.a).toBe(1);

  sandbox.inactive();
  expect(win.a).toBe(undefined);
});
