import { RouteConfig } from '../interfaces';

export function flattenRoutes(routes: RouteConfig[]): RouteConfig[] {
  return [
    ...routes,
    ...routes.reduce((accum: RouteConfig[], route) => {
      return [...accum, ...(route.routes ? flattenRoutes(route.routes) : [])];
    }, []),
  ];
}
