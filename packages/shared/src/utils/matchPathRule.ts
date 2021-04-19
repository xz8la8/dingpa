import * as pathToRegexp from 'path-to-regexp';
import { ParseOptions, TokensToRegexpOptions, Path } from 'path-to-regexp';
import { MatchRouteOptions } from '../interfaces';

type RegexpResult = {
  regexp: RegExp;
  keys: string[];
};

let regexpCache: Record<string, any> = Object.create(null);

const compilePath = (pathname: string, options: TokensToRegexpOptions & ParseOptions): RegexpResult => {
  const cacheKey = `${pathname}${options.strict}${options.sensitive}`;
  const cache = regexpCache[cacheKey] || (regexpCache[cacheKey] = {});

  if(cache[pathname]) return cache[pathname];

  const keys: string[] = [];
  const regexp = pathToRegexp(pathname, keys, options);

  return {
    regexp,
    keys,
  }
};

export const matchPath = (pathname: string, options: MatchRouteOptions) => {
  const {exact = false, strict = false, sensitive = false, path } = options;

  if(!path) {
    return null;
  }

  const pathOptions = {
    end: exact,
    strict,
    sensitive,
  };

  const { regexp, keys } = compilePath(pathname, pathOptions);

  const match = regexp.exec(pathname);
  if (!match) return null;

  const [url, ...values] = match;
  const isExact = pathname === url;

  if(exact && !isExact) {
    return null;
  }

  if(exact && !isExact) {
    return null;
  }

  return {
    path,
    url: path === '/' && url === '' ? '/' : url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key] = values[index];
      return memo;
    }, {}),
  }
};
