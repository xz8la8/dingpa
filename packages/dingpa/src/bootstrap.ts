import { getContainer, getStore, warning } from '@dingpa/shared';
import { callMount, callUnmount } from './appLifeCycle';
import loadAssets from './loadAssets';
import { getMicroApps, MicroApp } from './registerMicroApps';

let lastUrl: string = null;
let lastMached: boolean = false;

let mountedMicroApps: MicroApp[] = [];
let unmountedMicroApps: MicroApp[] = [];

let canRouteMicroApp = false;

export function routeMicroApp(url: string) {
  if (!canRouteMicroApp) {
    return false;
  }
  if (lastUrl === url) {
    return lastMached;
  }

  const mountApps: MicroApp[] = [];
  const unmountApps: MicroApp[] = [];

  let matched: boolean = false;

  getMicroApps().forEach((microApp) => {
    const isActiveApp = microApp.activeRule(url);
    if (isActiveApp) {
      matched = true;
    }
    if (isActiveApp && !mountedMicroApps.includes(microApp)) {
      mountApps.push(microApp);
    }

    if (!isActiveApp && mountedMicroApps.includes(microApp)) {
      unmountApps.push(microApp);
    }
  });

  Promise.all(
    unmountApps
      .map(async (unmountApp) => {
        await unmountMicroApp(unmountApp);

        unmountedMicroApps.push(unmountApp);
        mountedMicroApps = mountedMicroApps.filter((app) => {
          return app !== unmountApp;
        });
      })
      .concat(
        mountApps.map(async (mountApp) => {
          await mountMicroApp(mountApp);
          mountedMicroApps.push(mountApp);
          unmountedMicroApps = unmountedMicroApps.filter((app) => {
            return app !== mountApp;
          });
        }),
      ),
  );

  lastUrl = url;
  lastMached = matched;

  return matched;
}

export async function unmountMicroApp(microApp: MicroApp) {
  const { sandbox, unloadAssets } = microApp;
  const container = getContainer(getStore('container'));

  callUnmount(container);
  unloadAssets && unloadAssets();
  sandbox.inactive();
}

export async function mountMicroApp(microApp: MicroApp) {
  const container = getContainer(getStore('container'));

  if (!container) {
    warning(false, `micro app ${microApp.name} already been registered`);
    return;
  }

  const { scripts, styles, sandbox, props } = microApp;

  manager.showLoading();
  sandbox.active();
  loadAssets(scripts, styles).then((unloadAssets) => {
    manager.hideLoading();
    microApp.unloadAssets = unloadAssets;
    callMount(container, props);
  });
}

type BootstrapOptions = {
  showLoading: () => void;
  hideLoading: () => void;
  onError?: (e: Error) => void;
  routeMicroApp?: (url: string) => boolean;
};

const manager: BootstrapOptions = {
  showLoading: () => {},
  hideLoading: () => {},
  routeMicroApp,
};

export function bootstrap(options: BootstrapOptions, routeOrNot: boolean = true) {
  canRouteMicroApp = true;
  if (options) {
    Object.keys(options).forEach((key) => {
      manager[key] = options[key];
    });
  }

  if (routeOrNot) {
    manager.routeMicroApp(location.href);
  }
}
