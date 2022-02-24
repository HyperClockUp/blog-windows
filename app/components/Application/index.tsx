import React from "react";
import { killProcess, moveWindowToTop } from "../../features/core/CoreSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Process } from "../../types/Process";
import { Program } from "../../types/Program";
import { checkIfChildren } from "../../utils";
import styles from "./index.css";

export interface ApplicationProps {
  children: React.ReactNode;
  program: Program;
  process: Process;
}

const Application = (props: ApplicationProps) => {
  const { children, program, process } = props;
  const [position, setPosition] = React.useState<React.CSSProperties>({});
  const isDragging = React.useRef(false);
  const startDragMousePosition = React.useRef<[number, number]>([0, 0]);
  const startDragPosition = React.useRef<React.CSSProperties>({});
  const applicationDOMRef = React.useRef<HTMLDivElement>(null);
  const applicationHeaderDOMRef = React.useRef<HTMLHeadElement>(null);

  const windowsState = useAppSelector((state) => state.core.windows);

  const dispatch = useAppDispatch();

  const mouseDownHandler = React.useCallback((e: MouseEvent) => {
    if (
      !checkIfChildren(
        e.target as HTMLElement,
        applicationHeaderDOMRef.current
      ) ||
      !applicationDOMRef.current
    ) {
      return;
    }
    startDragMousePosition.current = [e.clientX, e.clientY];
    isDragging.current = true;
    startDragPosition.current =
      applicationDOMRef.current?.getBoundingClientRect();
    e.stopPropagation();
  }, []);

  const mouseUpHandler = React.useCallback((e: MouseEvent) => {
    isDragging.current = false;
  }, []);

  const mouseMoveHandler = React.useCallback((e: MouseEvent) => {
    if (!isDragging.current) {
      return;
    }
    const startX = startDragPosition.current.left || 0;
    const startY = startDragPosition.current.top || 0;
    const deltaX = e.clientX - startDragMousePosition.current[0];
    const deltaY = e.clientY - startDragMousePosition.current[1];
    setPosition({
      top: Number(startY) + deltaY,
      left: Number(startX) + deltaX,
    });
  }, []);

  const containerLoadedHandler = React.useCallback(() => {
    if (!applicationDOMRef.current) {
      return;
    }
    setPosition(applicationDOMRef.current.getBoundingClientRect());
  }, []);

  const closeBtnHandler = React.useCallback(() => {
    if (!process) {
      return;
    }
    dispatch(killProcess(process.id));
  }, [dispatch, process]);

  const moveTopHandler = React.useCallback(()=>{
    dispatch(moveWindowToTop(process.id));
    console.log('1111');
  },[dispatch, process.id]);

  React.useEffect(() => {
    window.addEventListener("mouseup", mouseUpHandler, true);
    window.addEventListener("mousemove", mouseMoveHandler, true);
    window.addEventListener("mousedown", mouseDownHandler, true);
    return () => {
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [mouseDownHandler, mouseUpHandler, mouseMoveHandler]);

  return (
    <div
      className={styles.applicationContainer}
      ref={applicationDOMRef}
      style={{
        ...position,
        zIndex: windowsState[process.id]?.zIndex,
      }}
      onLoad={containerLoadedHandler}
      onMouseDown={moveTopHandler}
      onTouchStart={moveTopHandler}
    >
      <header
        className={styles.applicationHeader}
        ref={applicationHeaderDOMRef}
      >
        <img
          className={styles.headerIcon}
          src={program.icon}
          alt={program.name}
        />
        <span className={styles.headerTitle}>{program.title}</span>
        <div className={styles.headerButtons}>
          <button onClick={closeBtnHandler}>×</button>
        </div>
      </header>
      <main className={styles.applicationBody}>{children}</main>
    </div>
  );
};

export default Application;
