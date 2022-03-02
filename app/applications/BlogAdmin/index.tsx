import React from "react";
import Loadable from "react-loadable";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const context: Context = [
  {
    title: "打开博客后台",
    handler: () => window.open("https://blog.chengfeixiang.cn/admin", "_blank"),
  },
];

const App = Loadable({
  loader: () => import(/* webpackChunkName: 'BlogRenderer'*/ "./render"),
  loading: () => <div>Loading...</div>,
});

const BlogAdminApp: Application = {
  app: <App />,
  context,
  handler: console.log,
};

export default BlogAdminApp;
