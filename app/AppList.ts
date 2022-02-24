import { Program } from "./types/Program";

import systemSettingIcon from "./assets/images/system.svg";
import systemSetting from "./applications/SystemSettings";

import browserIcon from "./assets/images/Edge.svg";
import browser from "./applications/SystemBrowser";

const programIds = () => {
  let _id = 1;
  return () => {
    _id += 1;
    return _id;
  };
};

const ids = programIds();

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

const AppList: Record<string, Program> = {
  [SystemSettingsProgram.name]: SystemSettingsProgram,
  [SystemBrowserProgram.name]: SystemBrowserProgram,
};

export const getAppById = (id: Program["id"]) => {
  return Object.values(AppList).find((app) => app.id === id) || null;
};

export default AppList;
