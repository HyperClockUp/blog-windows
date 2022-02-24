import React from "react";
import AppList from "../../../AppList";
import { setShowWindowsMenu } from "../../../features/settings/SettingsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import WindowsMenu from "../../WindowsMenu";
import styles from "./index.css";

const TaskBar = () => {
  const dispatch = useAppDispatch();

  const [time, setTimes] = React.useState("");
  const showWindowsMenu = useAppSelector(
    (state) => state.settings.showWindowsMenu
  );

  const timer = React.useRef<number | undefined>();

  const runningProcesses = useAppSelector((state) => state.core.processes);

  const AllProcesses = React.useMemo(() => {
    return runningProcesses.filter((process) => {
      return !!AppList[process.name];
    });
  }, [runningProcesses]);

  const updateTime = React.useCallback(() => {
    const newTime = new Date();
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    // const seconds = newTime.getSeconds();
    const timeString = `${hours}:${minutes}`;
    const dateString = `${newTime.getFullYear()}/${
      newTime.getMonth() + 1
    }/${newTime.getDate()}`;
    setTimes(`${timeString}\n${dateString}`);
  }, []);

  const menuIconClickHandler = React.useCallback(() => {
    dispatch(setShowWindowsMenu(!showWindowsMenu));
  }, [dispatch, showWindowsMenu]);

  React.useEffect(() => {
    timer.current = window.setInterval(updateTime, 1000);
    return () => {
      window.clearInterval(timer.current);
    };
  }, [updateTime]);

  return (
    <div className={styles.taskBarContainer}>
      <WindowsMenu show={showWindowsMenu}>
        <div className={styles.menuIcon} onClick={menuIconClickHandler} />
      </WindowsMenu>
      <div className={styles.tasksContainer}>
        {AllProcesses.map((process) => {
          const AppInfo = AppList[process.name];
          return (
            <div className={styles.taskItem} key={process.id}>
              <img className={styles.taskIcon} src={AppInfo.icon} alt={AppInfo.title} />
              <span className={styles.taskName}>{AppInfo.title}</span>
            </div>
          );
        })}
      </div>
      <span className={styles.timeContainer}>{time}</span>
    </div>
  );
};

export default TaskBar;
