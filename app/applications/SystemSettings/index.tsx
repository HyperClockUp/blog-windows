import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "系统设置",
    handler: () => alert(navigator.userAgent),
  },
];

const App = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'SystemSettingsRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const SystemSettingApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemSettingApp;
