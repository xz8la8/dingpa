import { isUndefined } from './lang';

const namespace = '__DINGPA__';

const global = window as any;

export const setStore = (key: string, value: any): void => {
  if (!global[namespace]) {
    global[namespace] = Object.create(null);
  }
  global[namespace][key] = value;
};

export const getStore = <T>(key: string): T | null => {
  const store = global[namespace];
  return store && !isUndefined(store[key]) ? store[key] : null;
};
