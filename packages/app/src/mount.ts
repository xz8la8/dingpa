import { setStore } from '@dingpa/shared';


export default function mount(cb: (container: HTMLElement, props: Record<string, any>) => void) {
  setStore('appMount', cb);
}
