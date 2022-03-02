import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "打开博客",
    handler: () => window.open("https://blog.chengfeixiang.cn", "_blank"),
  },
];

const App = Loadable({
  loader: () => import(/* webpackChunkName: 'BlogRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const BlogApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default BlogApp;
