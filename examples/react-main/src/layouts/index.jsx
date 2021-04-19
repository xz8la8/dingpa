import React from "react";
import { history } from "umi";
import routes from "@/configs/routes";
import { registerMicroApps, bootstrap } from 'dingpa';

const appEntries = [
  {
    path: "/child01",
    js: `http://127.0.0.1:8383/umi.js`,
  }
];

registerMicroApps(appEntries);

export default class LayoutPage extends React.Component {
  moduleInfo = {};

  componentDidMount() {
    window.__history = history;

    bootstrap({});
  }

  render() {
    return (
      <div>
        <h3>Main App Layout</h3>
        <div id="dingpa-container">
          
        </div>
      </div>
    );
  }
}
