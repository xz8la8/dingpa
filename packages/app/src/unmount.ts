import { setStore } from '@dingpa/shared';

export default function mount(cb: (container) => void) {
  setStore('appUnmount', cb);
}
