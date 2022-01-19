import { commonAPIToken } from './../common/index';
import { setBackgroundImage } from "../features/settings/SettingsSlice";
import { get } from "../network/request";
import { store } from "../store";

export const initBackgroundImage = async () => {
  const res = await get("https://api.sumt.cn/api/bing.php", {
    token: commonAPIToken,
    format: "json",
  });
  store.dispatch(setBackgroundImage(res.img_url));
};
