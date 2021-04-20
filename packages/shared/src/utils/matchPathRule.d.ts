import { MatchRouteOptions } from '../interfaces';
export declare const matchPath: (url: string, options: MatchRouteOptions) => {
    path: string;
    url: string;
    isExact: boolean;
    params: {};
};
