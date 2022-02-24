import { store } from './../store/index';


export const checkAuth = () => {
  return store.getState().user.isLogin;
};

