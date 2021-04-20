import React from 'react';
import { history } from 'umi';
import routes from '@/configs/routes';
import { registerMicroApps, bootstrap, setContainer, routeMicroApp, matchRoutes } from 'dingpa';

const appEntries = [
  {
    name: 'child01',
    activePath: '/child01',
    scripts: [`http://127.0.0.1:8282/umi.js`],
    styles: [`http://127.0.0.1:8282/umi.css`],
  },
  {
    name: 'child02',
    activePath: '/child02',
    scripts: [`http://127.0.0.1:8383/umi.js`],
    styles: [`http://127.0.0.1:8383/umi.css`],
  },
];

registerMicroApps(appEntries);

window.getHistory = () => {
  return history;
};

export default class LayoutPage extends React.Component {
  state = {
    masterMatched: false,
    loading: false,
  };

  matchPath = matchRoutes(routes);

  moduleInfo = {};

  componentDidMount() {
    setContainer('#dingpa-container');
    bootstrap(
      {
        showLoading: this.showLoading,
        hideLoading: this.hideLoading,
      },
      false,
    );

    this.renderWhat();
  }

  componentDidUpdate(prevProps) {
    this.renderWhat(prevProps.location.pathname);
  }

  showLoading = () => {
    this.setState({
      loading: true,
    });
  };
  hideLoading = () => {
    this.setState({
      loading: false,
    });
  };

  renderWhat(prevPathname) {
    const { pathname } = this.props.location;
    if (prevPathname === pathname) {
      return;
    }

    const masterMatched = this.matchPath(pathname);
    if (masterMatched) {
      this.setState({ masterMatched });
    }

    const microMatched = routeMicroApp(pathname);

    this.setState({
      masterMatched: !microMatched,
    });
  }

  render() {
    const { masterMatched, loading } = this.state;
    console.log('loading: ', loading);
    return (
      <div>
        <div style={{ background: '#eee', padding: 16 }}>Main App Layout</div>
        <div>{loading ? 'loading...' : null}</div>
        <div id="dingpa-container">{masterMatched ? this.props.children : null}</div>
      </div>
    );
  }
}
