import React, { useEffect } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from './index.css';

const HelloWorld = () => {
  const [resume, setResume] = React.useState("");
  const fetchResume = React.useCallback(async () => {
    const resumePath = await import("../../../public/resume.md");
    const res = await fetch(resumePath.default);
    const text = await res.text();
    setResume(text);
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const Resume = React.useMemo(() => {
    return <ReactMarkDown remarkPlugins={[remarkGfm]}>{resume}</ReactMarkDown>;
  }, [resume]);

  return <div className={styles.resumeContainer}>{Resume}</div>;
};

export default HelloWorld;
