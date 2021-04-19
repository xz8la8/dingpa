import { warning, isFunction, matchPath } from '@dingpa/shared';
import { MicroAppEnty } from './interfaces';
import { createSandbox } from './sandbox';

let microApps: any[] = [];

export function getMicroApps() {
  return microApps;
}

function getMicroAppNames() {
  return microApps.map((app) => app.name);
}

function registerMicroApp(appEntry: MicroAppEnty) {
  if (getMicroAppNames().indexOf(appEntry.name) > -1) {
    warning(false, `micro app ${appEntry.name} already been registered`);
    return;
  }

  const { activePath, exact, sensitive, strict } = appEntry;

  let activeRule = registerMicroApp
    ? isFunction(activePath)
      ? activePath
      : (url: string) => {
          return matchPath(url, { path: activePath, exact, sensitive, strict });
        }
    : () => true;

  const microApp = {
    ...appEntry,
    activeRule,
    sandbox: createSandbox(appEntry.name),
  };

  microApps.push(microApp);
}

export default function registerMicroApps(appEntries: MicroAppEnty[]) {
  appEntries.forEach((appEntry) => {
    registerMicroApp(appEntry);
  });
}
