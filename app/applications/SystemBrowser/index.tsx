import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "打开百度",
    handler: () => window.open("https://www.baidu.com", "_blank"),
  },
];

const App = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'SystemBrowserRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const SystemBrowserApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemBrowserApp;
