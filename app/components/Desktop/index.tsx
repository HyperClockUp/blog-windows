import React from "react";
import TaskBar from "./TaskBar";
import styles from "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppIcon from "./AppIcon";
import WindowsContext from "../WindowsContext";
import Selection from "../Selection";
import { Program } from "../../types/Program";
import { createParentProcess } from "../../features/core/CoreSlice";
import Application from "../Application";
import AppList from "../../AppList";

const Desktop = () => {
  const dispatch = useAppDispatch();

  // 已经安装了的应用
  const installedPrograms = useAppSelector((state) => state.core.programs);

  // 正在运行的应用
  const runningProcesses = useAppSelector((state) => state.core.processes);

  // 背景图片
  const backgroundImage = useAppSelector(
    (state) => state.settings.backgroundImage
  );

  // 系统右键菜单位置
  const [windowsContextPosition, setWindowsContextPosition] = React.useState<
    [number, number]
  >([0, 0]);

  const [rightClickedProgram, setRightClickedProgram] = React.useState<
    Program["id"] | null
  >(null);

  const [activeProgram, setActiveProgram] = React.useState<Program["id"][]>([]);

  const [showWindowsContext, setShowWindowsContext] =
    React.useState<boolean>(false);

  const appIconDOMRefList = React.useRef<Record<string, HTMLDivElement | null>>(
    {}
  );
  const appIconBoundingList = React.useRef<Record<string, DOMRect>>({});

  const installedProgramList = React.useMemo(() => {
    return Object.values(installedPrograms);
  }, [installedPrograms]);

  const rightClickHandler = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      programId: Program["id"]
    ) => {
      setWindowsContextPosition([e.pageX, e.pageY]);
      setRightClickedProgram(programId);
    },
    []
  );

  const selectionHandler = React.useCallback((rect) => {
    const activeApp: Program["id"][] = [];
    Reflect.ownKeys(appIconBoundingList.current).forEach((programId) => {
      const appRect = appIconBoundingList.current[programId as string];
      const minX = Math.max(appRect.left, rect.left);
      const minY = Math.max(appRect.top, rect.top);
      const maxX = Math.min(
        appRect.right,
        document.body.clientWidth - (rect.left + rect.width)
      );
      const maxY = Math.min(
        appRect.bottom,
        document.body.clientHeight - (rect.top + rect.height)
      );

      if (maxX > minX && maxY > minY) {
        activeApp.push(Number(programId) as Program["id"]);
      }
    });
    console.log({ activeApp });
    setActiveProgram(activeApp);
  }, []);

  const AllPrograms = React.useMemo(() => {
    return installedProgramList.map((program) => {
      return (
        <div
          ref={(ref) => {
            const programIdStr = program.id.toString();
            appIconDOMRefList.current[programIdStr] = ref;
            if (ref) {
              appIconBoundingList.current[programIdStr] =
                ref.getBoundingClientRect();
            }
          }}
          key={program.id}
          className={
            activeProgram.includes(program.id)
              ? styles.activeAppItemContainer
              : styles.appItemContainer
          }
          onClick={() => {
            setActiveProgram([program.id]);
          }}
          onDoubleClick={() => {
            dispatch(createParentProcess(program.id));
          }}
          onContextMenu={(e) => {
            rightClickHandler(e, program.id);
            setShowWindowsContext(true);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AppIcon program={program} />
        </div>
      );
    });
  }, [activeProgram, dispatch, installedProgramList, rightClickHandler]);

  const AllApplications = React.useMemo(() => {
    return runningProcesses.map((process) => {
      const AppInfo = AppList[process.name];
      return (
        <Application key={process.id} program={AppInfo} process={process}>
          {AppInfo.app?.app()}
        </Application>
      );
    });
  }, [runningProcesses]);

  const BackgroundImage = React.useMemo(() => {
    if (!backgroundImage) {
      return null;
    }
    return (
      <div
        className={styles.desktopBackground}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    );
  }, [backgroundImage]);

  const desktopClickHandler: React.MouseEventHandler = React.useCallback(
    (e) => {
      if (e.button === 0) {
        setShowWindowsContext(false);
      }
    },
    []
  );

  const desktopMouseDownHandler: React.MouseEventHandler = React.useCallback(
    (e) => {
      if (e.button === 0) {
        setShowWindowsContext(false);
        setActiveProgram([]);
      }
    },
    []
  );

  return (
    <div
      className={styles.desktopContainer}
      onContextMenu={(e) => {
        setWindowsContextPosition([e.pageX, e.pageY]);
        setRightClickedProgram(null);
        setShowWindowsContext(true);
        e.preventDefault();
      }}
      onClick={desktopClickHandler}
      onMouseDown={desktopMouseDownHandler}
    >
      {BackgroundImage}
      <div
        className={styles.appContainer}
        onContextMenu={(e) => e.preventDefault()}
      >
        {AllPrograms}
        <Selection onSelect={selectionHandler} />
        {AllApplications}
      </div>
      <div className={styles.taskBarContainer}>
        <TaskBar />
      </div>
      <WindowsContext
        show={showWindowsContext}
        programId={rightClickedProgram}
        position={windowsContextPosition}
      />
    </div>
  );
};

export default Desktop;
