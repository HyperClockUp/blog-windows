import React from "react";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const SystemBrowser = () => {
  return <div>这是系统浏览器啊12222</div>;
};

export const context: Context = [
  {
    title: "打开百度",
    handler: () => window.open("https://www.baidu.com", "_blank"),
  },
];

const SystemBrowserApp: Application = {
  app: SystemBrowser,
  context,
  handler: console.log,
};

export default SystemBrowserApp;
