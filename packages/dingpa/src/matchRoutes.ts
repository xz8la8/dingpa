import { flattenRoutes, matchPath, RouteConfig } from '@dingpa/shared';

export default function matchRoutes(routes: RouteConfig[]) {
  const flattenedRoutes = flattenRoutes(routes);

  return function (url: string) {
    return flattenedRoutes.some((route) => {
      return !!matchPath(url, route);
    });
  };
}
