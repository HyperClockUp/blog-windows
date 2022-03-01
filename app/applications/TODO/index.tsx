import React from "react";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "Hello World",
    handler: () => window.alert("hello world"),
  },
];

const App = React.lazy(() => import("./render"));

const SystemBrowserApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemBrowserApp;
