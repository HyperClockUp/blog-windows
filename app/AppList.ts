import { Program } from "./types/Program";

import systemSettingIcon from "./assets/images/system.svg";
import systemSetting from "./applications/SystemSettings";

import browserIcon from "./assets/images/Edge.svg";
import browser from "./applications/SystemBrowser";

import todoIcon from "./assets/images/todo.svg";
import todo from "./applications/TODO";

import blogIcon from "./assets/images/blog.svg";
import blog from "./applications/Blog";

import blogAdminIcon from "./assets/images/admin.svg";
import blogAdmin from "./applications/BlogAdmin";

import resumeIcon from "./assets/images/resume.svg";
import resume from "./applications/Resume";

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

export const BlogProgram: Program = {
  id: ids(),
  name: "blog",
  title: "Cheng's blog",
  icon: blogIcon,
  app: blog,
};

export const BlogAdminProgram: Program = {
  id: ids(),
  name: "blog-admin",
  title: "Cheng's blog admin",
  icon: blogAdminIcon,
  app: blogAdmin,
};

export const ResumeProgram: Program = {
  id: ids(),
  name: "resume",
  title: "Resume",
  icon: resumeIcon,
  app: resume,
};




const AppList: Record<string, Program> = {
  [SystemSettingsProgram.name]: SystemSettingsProgram,
  [SystemBrowserProgram.name]: SystemBrowserProgram,
  [TodoProgram.name]: TodoProgram,
  [BlogProgram.name]: BlogProgram,
  [BlogAdminProgram.name]: BlogAdminProgram,
  [ResumeProgram.name]: ResumeProgram,
};

export default AppList;
