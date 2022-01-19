import React from 'react';
import { Program } from '../../../types/Program';
import styles from './index.css';

interface AppIconProps {
  program: Program;
}

const AppIcon = (props: AppIconProps) => {
  const { program } = props;
  return (
    <div className={styles.appIconContainer}>
      <img className={styles.appIcon} src={program.icon} alt={program.name} />
      <p className={styles.appName}>{program.title}</p>
    </div>
  );
};

export default AppIcon;