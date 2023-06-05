import { commonAPIToken } from "./../common/index";
import { setBackgroundImage } from "../features/settings/SettingsSlice";
import { get } from "../network/request";
import { store } from "../store";
import defaultBg from "../assets/images/defaultBg.jpg";

export const initBackgroundImage = async () => {
  const remoteBg = async () => {
    const res = await get("https://api.sumt.cn/api/bing.php", {
      token: commonAPIToken,
      format: "json",
    });
    return res.data.img;
  };

  const timeoutLocalBg = new Promise((res, rej) => {
    window.setTimeout(() => {
      res(defaultBg);
    }, 1000);
  });

  const bgUrl = await Promise.race([remoteBg(), timeoutLocalBg]);
  store.dispatch(setBackgroundImage(bgUrl));
};
