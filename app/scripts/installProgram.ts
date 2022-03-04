import { TodoProgram, SystemBrowserProgram, SystemSettingsProgram, BlogProgram, BlogAdminProgram, ResumeProgram } from "./../AppList";
import { batchInstallProgram } from "../features/core/CoreSlice";
import { store } from "./../store";

/**
 * 安装程序
 */
export const initInstallProgram = () => {
  store.dispatch(
    batchInstallProgram([
      SystemSettingsProgram,
      SystemBrowserProgram,
      TodoProgram,
      BlogProgram,
      BlogAdminProgram,
      ResumeProgram
    ])
  );
};
