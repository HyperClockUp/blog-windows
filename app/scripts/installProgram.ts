import { SystemBrowserProgram, SystemSettingsProgram } from "./../AppList";
import { batchInstallProgram } from "../features/core/CoreSlice";
import { store } from "./../store";

/**
 * 安装程序
 */
export const initInstallProgram = () => {
  store.dispatch(
    batchInstallProgram([SystemSettingsProgram, SystemBrowserProgram])
  );
};
