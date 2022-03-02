import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "每日一文",
    handler: () => {
      return;
    },
  },
];

const App = Loadable({
  loader: () => import(/* webpackChunkName: 'BlogRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const DailyArticleApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default DailyArticleApp;
