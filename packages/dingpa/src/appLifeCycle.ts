import { getStore } from '@dingpa/shared';

export function callMount(container: HTMLElement, props: Record<string, any>) {
  const mountCallback: typeof callMount = getStore('appMount');
  if (mountCallback) {
    mountCallback(container, props);
  }
}

export function callUnmount(container: HTMLElement) {
  const unmountCallback: typeof callUnmount = getStore('appUnmount');
  if (unmountCallback) {
    unmountCallback(container);
  }
}
