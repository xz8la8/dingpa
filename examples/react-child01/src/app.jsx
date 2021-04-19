import ReactDOM from 'react-dom';
import { mount, unmount, isInDingpa } from '@dingpa/app';

export function modifyClientRenderOpts(args) {
  if (!isInDingpa()) {
    return args;
  }
  return {
    ...args,
    rootElement: null,
  };
}

export function rootContainer(container) {
  if (!isInDingpa()) {
    return container;
  }

  mount((mounter) => {
    ReactDOM.render(container, mounter);
  })

  unmount((mounter) => {
    ReactDOM.unmountComponentAtNode(mounter);
  })
}
