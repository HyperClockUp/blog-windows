import React from "react";
import { Context } from "../../types/Context";
import { Application } from "../../types/Application";

const SystemSettings = () => {
  return <div></div>;
};

export const context: Context = [
  {
    title: "系统设置",
    handler: () => alert(navigator.userAgent),
  },
];

const SystemSettingApp: Application = {
  app: SystemSettings,
  context,
  handler: console.log,
};

export default SystemSettingApp;
