import React from "react";
import Attach from "../Attach";
import styles from "./index.css";
import userAvatar from "../../assets/images/user.svg";
import powerIcon from "../../assets/images/power.svg";
import { useAppDispatch } from "../../store/hooks";
import { setShowWindowsMenu } from "../../features/settings/SettingsSlice";
import { checkIfChildren } from "../../utils";

const WindowsMenu = () => {
  const dispatch = useAppDispatch();
  const windowsMenuDOMRef = React.useRef<HTMLDivElement>(null);

  const blurHandler = React.useCallback(
    (e: MouseEvent) => {
      if (!windowsMenuDOMRef.current) {
        return;
      }
      if (
        !checkIfChildren(e.target as HTMLElement, windowsMenuDOMRef.current)
      ) {
        dispatch(setShowWindowsMenu(false));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    window.addEventListener("click", blurHandler);
    return () => {
      window.removeEventListener("click", blurHandler);
    };
  }, [blurHandler]);

  return (
    <div className={styles.menuContainer} ref={windowsMenuDOMRef}>
      <div className={styles.menuHeader}>
        <img className={styles.avatar} src={userAvatar} alt="avatar" />
        <span className={styles.userName}>Admin, Welcome</span>
      </div>
      <div className={styles.menuBody}>
        <div className={styles.systemOperationContainer}>
          <div className={styles.systemOperation}>
            <div
              className={styles.systemOperationIcon}
              style={{ backgroundImage: `url(${powerIcon})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface WindowsMenuAttachProps {
  children: JSX.Element;
  show?: boolean;
}

const WindowsMenuAttach = (props: WindowsMenuAttachProps) => {
  const { children, show = true } = props;
  return (
    <Attach attachContent={<WindowsMenu />} placement="topLeft" show={show}>
      {children}
    </Attach>
  );
};

export default WindowsMenuAttach;
