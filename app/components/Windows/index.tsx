import React from 'react';
import { initBackgroundImage } from '../../scripts/initSystem';
import { initInstallProgram } from '../../scripts/installProgram';
import Desktop from '../Desktop';

const Windows = () => {

  const init = React.useCallback(()=>{
    initInstallProgram();
    initBackgroundImage();
  },[]);

  React.useEffect(()=>{
    init();
  },[init]);

  return <Desktop></Desktop>;
};

export default Windows;