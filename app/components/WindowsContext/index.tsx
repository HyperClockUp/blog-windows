import React from "react";
import styles from "./index.css";
import { Context } from "../../types/Context";
import { Program } from "../../types/Program";
import { getAppById } from "../../utils/storeUtils";

interface WindowsContextProps {
  programId?: Program["id"] | null;
  position: [number, number];
  show?: boolean;
  menus?: Context;
  onClick?: () => void;
}

const defaultMenus: Context = [
  {
    title: "Right Menu",
    handler: () => alert("Right Menu"),
  },
];

const WindowsContext = (props: WindowsContextProps) => {
  const { programId, position, show, menus = defaultMenus, onClick } = props;

  const context = React.useMemo(() => {
    if (!programId) {
      return menus;
    }
    return getAppById(programId)?.app?.context || defaultMenus;
  }, [menus, programId]);

  if (!position || !show) {
    return null;
  }
  return (
    <ul
      className={styles.menuContainer}
      style={{ left: position[0], top: position[1] }}
      onClick={onClick}
    >
      {context.map((item) => {
        return (
          <li
            key={item.title}
            className={styles.menuItemContainer}
            onClick={item.handler}
          >
            {item.icon && <img src={item.icon} alt={`${item.title} icon`} />}
            <span>{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default WindowsContext;
