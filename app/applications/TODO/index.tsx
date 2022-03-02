import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "Hello World",
    handler: () => window.alert("hello world"),
  },
];

const App = Loadable({
  loader: () => import(/* webpackChunkName: 'TODORenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const SystemBrowserApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default SystemBrowserApp;
