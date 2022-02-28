import React, { Suspense } from "react";
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

  // 右键选中的程序
  const [rightClickedProgram, setRightClickedProgram] = React.useState<
    Program["id"] | null
  >(null);

  // 选中态程序
  const [activeProgram, setActiveProgram] = React.useState<Program["id"][]>([]);

  // 是否展示右键菜单
  const [showWindowsContext, setShowWindowsContext] =
    React.useState<boolean>(false);

  // appIcon的DOM列表
  const appIconDOMRefList = React.useRef<Record<string, HTMLDivElement | null>>(
    {}
  );

  // appIcon的位置列表
  const appIconBoundingList = React.useRef<Record<string, DOMRect>>({});

  // 已经安装的程序列表
  const installedProgramList = React.useMemo(() => {
    return Object.values(installedPrograms);
  }, [installedPrograms]);

  /**
   * 处理右键
   */
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

  /**
   * 处理选中事件
   */
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
    setActiveProgram(activeApp);
  }, []);

  /**
   * 所有的程序
   */
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

  /**
   * 所有的应用窗口
   */
  const AllApplications = React.useMemo(() => {
    return runningProcesses.map((process) => {
      const AppInfo = AppList[process.name];
      if (!AppInfo.app) {
        return null;
      }
      const App = AppInfo.app.app;
      return (
        <Application key={process.id} program={AppInfo} process={process}>
          <Suspense fallback={""}>
            {App}
          </Suspense>
        </Application>
      );
    });
  }, [runningProcesses]);

  /**
   * 背景图片
   */
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

  /**
   * 桌面点击事件
   */
  const desktopClickHandler: React.MouseEventHandler = React.useCallback(
    (e) => {
      if (e.button === 0) {
        setShowWindowsContext(false);
      }
    },
    []
  );

  /**
   * 桌面鼠标按下事件
   */
  const desktopMouseDownHandler: React.MouseEventHandler = React.useCallback(
    (e) => {
      if (e.button === 0) {
        // setShowWindowsContext(false);
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
