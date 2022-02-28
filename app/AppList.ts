import { Program } from "./types/Program";

import systemSettingIcon from "./assets/images/system.svg";
import systemSetting from "./applications/SystemSettings";

import browserIcon from "./assets/images/Edge.svg";
import browser from "./applications/SystemBrowser";

import helloWorldIcon from "./assets/images/resume.svg";
import helloWorld from './applications/HelloWorld';

const ids = (() => {
  let _id = 1;
  return () => {
    _id += 1;
    return _id;
  };
})();

export const SystemSettingsProgram: Program = {
  id: ids(),
  name: "system-settings",
  title: "系统设置",
  icon: systemSettingIcon,
  app: systemSetting,
};

export const SystemBrowserProgram: Program = {
  id: ids(),
  name: "system-browser",
  title: "系统浏览器",
  icon: browserIcon,
  app: browser,
};

export const HelloWorldProgram: Program = {
  id: ids(),
  name: "hello-world",
  title: "Hello World",
  icon: helloWorldIcon,
  app: helloWorld,
};

const AppList: Record<string, Program> = {
  [SystemSettingsProgram.name]: SystemSettingsProgram,
  [SystemBrowserProgram.name]: SystemBrowserProgram,
  [HelloWorldProgram.name]: HelloWorldProgram,
};

export default AppList;
