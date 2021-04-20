import { setStore } from '@dingpa/shared';

export default function mount(cb: (container: HTMLElement) => void) {
  setStore('appUnmount', cb);
}
