import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "æįįŽå",
    handler: () => {
      return;
    },
  },
];

const App = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ResumeRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const ResumeApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default ResumeApp;
