import React from "react";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "系统设置",
    handler: () => alert(navigator.userAgent),
  },
];

const App = React.lazy(() => import("./render"));

const SystemSettingApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemSettingApp;
