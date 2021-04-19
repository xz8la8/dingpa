import { MountedContainer, setStore } from "@dingpa/shared";


export default function setContainer(container: MountedContainer) {
  setStore('container', container);
}