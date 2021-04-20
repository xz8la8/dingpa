export type MountedContainer = string | HTMLElement;

export type MatchRouteOptions = {
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  path?: string;
};

export type RouteConfig<Component = any> = {
  key?: string | number;
  component?: Component;
  path?: string;
  redirect?: string;
  exact?: boolean;
  strict?: boolean;
  routes?: RouteConfig[];
  [propName: string]: any;
};
