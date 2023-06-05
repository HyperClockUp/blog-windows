import React from "react";
import { bootstrap } from "../../scripts/bootstrap";
import { initBackgroundImage } from "../../scripts/initSystem";
import { initInstallProgram } from "../../scripts/installProgram";
import Desktop from "../Desktop";

const Windows = () => {
  const init = React.useCallback(() => {
    initInstallProgram();
    initBackgroundImage();
    bootstrap();
  }, []);

  React.useEffect(() => {
    init();
  }, [init]);

  return <Desktop />;
};

export default Windows;
