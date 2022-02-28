import React from "react";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "打开百度",
    handler: () => window.open("https://www.baidu.com", "_blank"),
  },
];

const App = React.lazy(() => import("./render"));

const SystemBrowserApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemBrowserApp;
