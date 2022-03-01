import { Program } from "./types/Program";

import systemSettingIcon from "./assets/images/system.svg";
import systemSetting from "./applications/SystemSettings";

import browserIcon from "./assets/images/Edge.svg";
import browser from "./applications/SystemBrowser";

import todoIcon from "./assets/images/todo.svg";
import todo from "./applications/TODO";

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

export const TodoProgram: Program = {
  id: ids(),
  name: "todo",
  title: "TODO",
  icon: todoIcon,
  app: todo,
};

const AppList: Record<string, Program> = {
  [SystemSettingsProgram.name]: SystemSettingsProgram,
  [SystemBrowserProgram.name]: SystemBrowserProgram,
  [TodoProgram.name]: TodoProgram,
};

export default AppList;
