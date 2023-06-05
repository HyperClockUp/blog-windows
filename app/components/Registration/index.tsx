import React from "react";
import styles from './index.module.scss';

export default () => {
  const handleClick = () => {
    window.open('https://beian.miit.gov.cn/');
  }
  return (
    <div className={styles.registration}>
      <p onClick={handleClick}>备案号：京ICP备2023008915号-1</p>
    </div>
  )
}