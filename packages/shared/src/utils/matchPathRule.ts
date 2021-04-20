// @ts-ignore
import { default as pathToRegexp, ParseOptions, Key } from 'path-to-regexp';
// @ts-ignore
import urlParse from 'url-parse';
import { MatchRouteOptions } from '../interfaces';

type RegexpResult = {
  regexp: RegExp;
  keys: Key[];
};

let regexpCache: Record<string, any> = Object.create(null);

const compilePath = (
  pathname: string,
  options: pathToRegexp.RegExpOptions & ParseOptions,
): RegexpResult => {
  const cacheKey = `${pathname}${options.strict}${options.sensitive}`;
  const cache = regexpCache[cacheKey] || (regexpCache[cacheKey] = {});

  if (cache[pathname]) return cache[pathname];

  const keys: Key[] = [];
  const regexp = pathToRegexp(pathname, keys, options);

  return {
    regexp,
    keys,
  };
};

export const matchPath = (url: string, options: MatchRouteOptions) => {
  const { pathname } = urlParse(url, true);
  const { exact = false, strict = false, sensitive = false, path } = options;

  if (!path) {
    return null;
  }

  const pathOptions = {
    end: exact,
    strict,
    sensitive,
  };

  const { regexp, keys } = compilePath(path, pathOptions);

  const match = regexp.exec(pathname);
  if (!match) return null;

  const [matchedUrl, ...values] = match;
  const isExact = pathname === matchedUrl;

  if (exact && !isExact) {
    return null;
  }

  return {
    path,
    url: path === '/' && matchedUrl === '' ? '/' : matchedUrl,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
};
