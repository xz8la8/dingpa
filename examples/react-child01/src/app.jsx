import ReactDOM from 'react-dom';
import { mount, unmount } from '@dingpa/app';
console.log('mount: ', mount);

export function modifyClientRenderOpts(args) {
  if (process.env.NODE_ENV === "development") {
    return args;
  }
  return {
    ...args,
    rootElement: null,
  };
}

export function rootContainer(container) {
  if (process.env.NODE_ENV === "development") {
    return container;
  }

  mount((mounter) => {
    ReactDOM.render(container, mounter);
  })

  unmount((mounter) => {
    ReactDOM.unmountComponentAtNode(mounter);
  })
}
