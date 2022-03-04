import React from "react";
import resume from "../../../public/resume.pdf";
import styles from "./index.css";

const Resume = () => {
  return <iframe className={styles.resumeContainer} src={resume} title="chengfx's resume" />;
};

export default Resume;
