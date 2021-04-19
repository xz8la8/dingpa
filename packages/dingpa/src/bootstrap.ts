import { getContainer, getStore, warning } from '@dingpa/shared';
import { callMount, callUnmount } from './appLifeCycle';
import loadAssets from './loadAssets';
import { getMicroApps } from './registerMicroApps';

let lastUrl: string = null;
let mountedMicroApps = [];
let unmountedMicroApps = [];

export function routeMicroApp(url: string) {
  if (lastUrl === url) {
    return;
  }

  const mountApps = [];
  const unmountApps = [];

  getMicroApps().forEach((microApp) => {
    const isActiveApp = microApp.activeRule(url);
    if (isActiveApp && !mountedMicroApps.includes(microApp)) {
      mountApps.push(microApp);
    }

    if (!isActiveApp && !unmountedMicroApps.includes(microApp)) {
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
}

export async function unmountMicroApp(microApp) {
  const { sandbox, unloadAssets } = microApp;
  const container = getContainer(getStore('container'));

  callUnmount(container);
  unloadAssets();
  sandbox.inactive();
}

export async function mountMicroApp(microApp) {
  const container = getContainer(getStore('container'));

  if (!container) {
    warning(false, `micro app ${microApp.name} already been registered`);
    return;
  }

  const { scripts, styles, sandbox, props } = microApp;

  sandbox.active();
  loadAssets(scripts, styles).then((unloadAssets) => {
    microApp.unloadAssets = unloadAssets;
    callMount(container, props);
  });
}

type BootstrapOptions = {
  showLoading: () => void;
  hideLoading: () => void;
  onError?: (e: Error) => void;
  routeMicroApp?: (url: string) => void;
};

const manager: BootstrapOptions = {
  showLoading: () => {},
  hideLoading: () => {},
  routeMicroApp,
};

export function bootstrap(options: BootstrapOptions) {
  if (options) {
    Object.keys(options).forEach((key) => {
      manager[key] = options[key];
    });
  }

  manager.routeMicroApp(location.href);
}
