import React from "react";
import { nanoid } from "nanoid";
import { createPortal } from "react-dom";
import styles from "./index.css";

type Placement =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "rightTop"
  | "rightBottom"
  | "leftTop"
  | "leftBottom";

export interface AttachProps {
  id?: string | number;
  children?: JSX.Element;
  attachContent: React.ReactNode;
  placement?: Placement;
  margin?: number;
  show?: boolean;
}

const Attach = (props: AttachProps) => {
  const {
    id,
    children,
    attachContent,
    placement = "top",
    margin = 0,
    show = true,
  } = props;

  const attachContainer = React.useRef<HTMLDivElement | null>(null);

  const targetDOMRef = React.useRef<HTMLElement | null>(null);

  const uniqueId = React.useRef(id || `attach-container-${nanoid()}`);

  const [isContainerCreated, setIsContainerCreated] = React.useState(false);

  const [isTargetDOMRender, setIsTargetDOMRender] = React.useState(false);

  /**
   * @description create a new container
   */
  const createContainer = React.useCallback(() => {
    if (attachContainer.current) {
      return;
    }
    const container = document.createElement("div");
    container.id = uniqueId.current.toString();
    document.body.appendChild(container);
    attachContainer.current = container;
    setIsContainerCreated(true);
    return container;
  }, []);

  /**
   * @description remove the container
   */
  const destroyContainer = React.useCallback(() => {
    if (!attachContainer.current) {
      return;
    }
    attachContainer.current.remove();
    setIsContainerCreated(false);
  }, []);

  const attachStyles = React.useMemo<React.CSSProperties | null>(() => {
    if (
      !isContainerCreated ||
      !isTargetDOMRender ||
      !targetDOMRef.current ||
      !show
    ) {
      return null;
    }
    const targetDOMBounding = targetDOMRef.current.getBoundingClientRect();
    const styles: React.CSSProperties = {};
    switch (placement) {
      case "top": {
        styles.bottom =
          document.body.clientHeight - targetDOMBounding.top + margin;
        styles.left = targetDOMBounding.left + targetDOMBounding.width / 2;
        styles.transform = "translateX(-50%)";
        break;
      }
      case "topLeft": {
        styles.bottom =
          document.body.clientHeight - targetDOMBounding.top + margin;
        styles.left = targetDOMBounding.left;
        break;
      }
      case "topRight": {
        styles.bottom =
          document.body.clientHeight - targetDOMBounding.top + margin;
        styles.right = document.body.clientWidth - targetDOMBounding.right;
        break;
      }
      case "bottom": {
        styles.top = targetDOMBounding.bottom + margin;
        styles.left = targetDOMBounding.left + targetDOMBounding.width / 2;
        styles.transform = "translateX(-50%)";
        break;
      }
      case "bottomLeft": {
        styles.top = targetDOMBounding.bottom + margin;
        styles.left = targetDOMBounding.left;
        break;
      }
      case "bottomRight": {
        styles.top = targetDOMBounding.bottom + margin;
        styles.right = document.body.clientWidth - targetDOMBounding.right;
        break;
      }
      case "left": {
        styles.right =
          document.body.clientWidth - targetDOMBounding.left + margin;
        styles.top = targetDOMBounding.top + targetDOMBounding.height / 2;
        styles.transform = "translateY(-50%)";
        break;
      }
      case "leftTop": {
        styles.right =
          document.body.clientWidth - targetDOMBounding.left + margin;
        styles.top = targetDOMBounding.top;
        break;
      }
      case "leftBottom": {
        styles.right =
          document.body.clientWidth - targetDOMBounding.left + margin;
        styles.bottom = document.body.clientHeight - targetDOMBounding.bottom;
        break;
      }
      case "right": {
        styles.left = targetDOMBounding.right + margin;
        styles.top = targetDOMBounding.top + targetDOMBounding.height / 2;
        styles.transform = "translateY(-50%)";
        break;
      }
      case "rightTop": {
        styles.left = targetDOMBounding.right + margin;
        styles.top = targetDOMBounding.top;
        break;
      }
      case "rightBottom": {
        styles.left = targetDOMBounding.right + margin;
        styles.bottom = document.body.clientHeight - targetDOMBounding.bottom;
        break;
      }
    }
    return styles;
  }, [isContainerCreated, isTargetDOMRender, margin, placement, show]);

  const renderContent = React.useMemo(() => {
    const targetDOM = React.Children.only(children);
    if (!targetDOM) {
      return targetDOM || null;
    }
    const targetCloneDOM = React.cloneElement(targetDOM, {
      ref: (ref: HTMLElement | null) => {
        targetDOMRef.current = ref;
        setIsTargetDOMRender(true);
      },
    });

    if (!attachStyles || !attachContainer.current) {
      return targetCloneDOM;
    }

    return (
      <>
        {createPortal(
          <div className={styles.attachContainer} style={attachStyles}>
            {attachContent}
          </div>,
          attachContainer.current
        )}
        {targetCloneDOM}
      </>
    );
  }, [attachContent, attachStyles, children]);

  React.useEffect(() => {
    createContainer();
    return () => {
      destroyContainer();
    };
  }, [createContainer, destroyContainer]);

  return renderContent;
};

export default Attach;
