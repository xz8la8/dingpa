import { MountedContainer, setStore } from '@dingpa/shared';


export default function mount(cb: (container, props) => void) {
  setStore('appMount', cb);
}
