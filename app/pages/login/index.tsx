import React from "react";
import { login } from "../../features/user/UserSlice";
import { useNavigate } from "react-router-dom";
import RouterList from "../../router";
import styles from "./index.css";
import Win10Logo from "../../assets/images/win10Logo.png";
import { useAppDispatch } from "../../store/hooks";
import Tabs, { Tab } from "../../components/Tabs";

const tabs: Tab[] = [
  {
    id: "Welcome",
  },
  {
    id: "Login",
  },
  {
    id: "Done",
  },
];

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = () => {
    dispatch(login());
    navigate(RouterList.MAIN.path);
  };

  const [curTabId, setCurTabId] = React.useState<Tab["id"]>(tabs[0].id);

  const render = React.useCallback(
    (tabId: Tab["id"]) => {
      switch (tabId) {
        default:
        case "Welcome": {
          return (
            <div>
              <span>You haven't login,</span>
              <span
                onClick={() => {
                  setCurTabId("Login");
                }}
              >
                click me to login
              </span>
            </div>
          );
        }
        case "Login": {
          return (
            <div>
              <p>
                <span>user</span>
                <input type="text" />
              </p>
              <p>
                <span>password</span>
                <input type="password" />
              </p>
              <button
                onClick={() => {
                  setCurTabId("Done");
                }}
              >
                login
              </button>
            </div>
          );
        }
        case "Done": {
          return <div>You have login!</div>;
        }
      }
    },
    []
  );

  React.useEffect(()=>{
    if(curTabId === "Done"){
      setTimeout(() => {
        navigate(RouterList.TEST.path);
      }, 3000);
    }
  },[curTabId, navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBodyContainer}>
        <img src={Win10Logo} alt="" className={styles.loginLogoImage} />
        <p>Welcome to use Browser Win10!</p>
        <p>
          please{" "}
          <span className={styles.loginButton} onClick={loginHandler}>
            login
          </span>
        </p>
        <Tabs
          tabs={tabs}
          render={render}
          hideHeader
          activeTabId={curTabId}
          animated="slide"
        />
      </div>
    </div>
  );
};

export default LoginPage;
