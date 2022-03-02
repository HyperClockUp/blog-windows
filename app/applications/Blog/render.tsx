import React from "react";
import styles from './index.css';

const Blog = () => {
  const blogUrl = "https://blog.chengfeixiang.cn";
  return <iframe className={styles.blogContainer} src={blogUrl} title="blog"/>;
};

export default Blog;
