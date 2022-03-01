import React, { useEffect } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./index.css";

const TODOList = () => {
  const [todoList, setTodoList] = React.useState("");
  const fetchTODOList = React.useCallback(async () => {
    const todoPath = await import("../../../public/todo.md");
    const res = await fetch(todoPath.default);
    const text = await res.text();
    setTodoList(text);
  }, []);

  useEffect(() => {
    fetchTODOList();
  }, [fetchTODOList]);

  return (
    <div className={styles.todoListContainer}>
      <ReactMarkDown remarkPlugins={[remarkGfm]}>{todoList}</ReactMarkDown>
    </div>
  );
};

export default TODOList;
