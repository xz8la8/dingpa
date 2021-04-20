import matchRoutes from '../matchRoutes';

const routes = [
  {
    path: '/',
    redirect: '/crd/datasource',
    exact: true,
  },
  {
    path: '/home',
    component: './home',
    exact: true,
  },
  {
    component: './exception/404',
  }
];

const matchPath = matchRoutes(routes);

test('match', () => {
  expect(matchPath('/')).toBe(true);
  expect(matchPath('/home')).toBe(true);
});

test('not match', () => {
  expect(matchPath('/home/abc')).toBe(false);
  expect(matchPath('/hello')).toBe(false);
});
