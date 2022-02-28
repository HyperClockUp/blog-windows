import React from "react";
import styles from "./index.css";

export interface SelectionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface SelectionProps {
  onSelect: (rect: SelectionRect) => void;
}

const initRect: SelectionRect = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

const Selection = (props: SelectionProps) => {
  const { onSelect } = props;

  const isDragging = React.useRef(false);
  const [selectionStyle, setSelectionStyle] =
    React.useState<SelectionRect>(initRect);
  const startDragPosition = React.useRef<[number, number]>([0, 0]);

  const mouseDownHandler = React.useCallback(
    (e: MouseEvent) => {
      if (isDragging.current || e.button !== 0) {
        return;
      }
      isDragging.current = true;
      startDragPosition.current = [e.clientX, e.clientY];
      setSelectionStyle({
        left: e.clientX,
        top: e.clientY,
        width: 0,
        height: 0,
      });
    },
    [setSelectionStyle]
  );

  const mouseUpHandler = React.useCallback(
    (e: MouseEvent) => {
      isDragging.current = false;
      const [x, y] = startDragPosition.current;
      if ((x === e.clientX && y === e.clientY) || !onSelect) {
        return;
      }
      const { left, top, height, width } = selectionStyle;
      if (height && width) {
        const rect: SelectionRect = {
          left,
          top,
          height,
          width,
        };
        onSelect(rect);
        setSelectionStyle(initRect);
      }
    },
    [onSelect, selectionStyle]
  );

  const mouseMoveHandler = React.useCallback((e: MouseEvent) => {
    if (!isDragging.current) {
      return;
    }
    const [x, y] = startDragPosition.current;
    const width = e.clientX - x;
    const height = e.clientY - y;
    setSelectionStyle({
      left: width < 0 ? x + width : x,
      top: height < 0 ? y + height : y,
      width: Math.abs(width),
      height: Math.abs(height),
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    return () => {
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [mouseDownHandler, mouseMoveHandler, mouseUpHandler]);

  if (!selectionStyle.height || !selectionStyle.width) {
    return null;
  }
  return <div className={styles.selection} style={selectionStyle} />;
};

export default Selection;
