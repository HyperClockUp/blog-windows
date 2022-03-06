import { store } from "./../store/index";

export const checkAuth = () => {
  return store.getState().user.isLogin;
};

export const checkMobile = () => {
  const ua = navigator.userAgent;
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const  isIphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const  isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  const  isMobile = ipad || isIphone || isAndroid;
  return !!isMobile;
};
