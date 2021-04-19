import React from 'react';
import { history } from 'umi';
import routes from '@/configs/routes';
import { registerMicroApps, bootstrap, setContainer, routeMicroApp } from 'dingpa';

window.__history = history;

const appEntries = [
  {
    name: 'child01',
    activePath: '/child01',
    scripts: [`http://127.0.0.1:8282/umi.js`],
    styles: [],
  },
  {
    name: 'child02',
    activePath: '/child02',
    scripts: [`http://127.0.0.1:8383/umi.js`],
    styles: [],
  },
];

registerMicroApps(appEntries);

export default class LayoutPage extends React.Component {
  moduleInfo = {};

  componentDidMount() {
    setContainer('#dingpa-container');
    bootstrap({});

    // history.listen(({pathname}) => {
    //   debugger;
    //   routeMicroApp(pathname);
    // })
  }

  render() {
    return (
      <div>
        <h3>Main App Layout</h3>
        <div id="dingpa-container"></div>
      </div>
    );
  }
}
