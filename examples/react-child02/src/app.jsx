import ReactDOM from 'react-dom';
import { mount, unmount, isInDingpa } from '@dingpa/app';
import Router from '@@/router';

export function render(oldRender) {
  console.log('child02 isInDingpa: ', isInDingpa());
  if (!isInDingpa()) {
    return oldRender();
  }

  mount((mounter) => {
    ReactDOM.render(<Router />, mounter);
  });

  unmount((mounter) => {
    ReactDOM.unmountComponentAtNode(mounter);
  });
}
