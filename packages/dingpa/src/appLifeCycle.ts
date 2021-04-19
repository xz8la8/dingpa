import { getStore } from "@dingpa/shared";

export function callMount(container, props) {
  const mountCallback = getStore('appMount');
  if(mountCallback) {
    mountCallback(container, props);
  }
}

export function callUnmount(container) {
  const unmountCallback = getStore('appUnmount');
  if(unmountCallback) {
    unmountCallback(container);
  }
}