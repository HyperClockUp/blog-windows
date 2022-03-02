import React from "react";
import styles from './index.css';

const BlogAdmin = () => {
  const blogUrl = "https://blog.chengfeixiang.cn/admin";
  return <iframe className={styles.blogAdminContainer} src={blogUrl} title="blog"/>;
};

export default BlogAdmin;
