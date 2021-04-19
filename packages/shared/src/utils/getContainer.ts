import { MountedContainer } from '../interfaces';

export function getContainer(container: MountedContainer): HTMLElement | null {
  return typeof container === 'string' ? document.querySelector(container) : container;
}
