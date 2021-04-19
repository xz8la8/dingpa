import routes from '@/configs/routes';

export function patchRoutes({ routes: defaultRoutes }) {
  // eslint-disable-next-line
  defaultRoutes[0].routes = routes.concat(defaultRoutes[0].routes);
}
