import React from "react";
import { get } from "../../network/request";

import styles from "./index.css";

const SystemSettings = () => {
  const [IPAddress, setIPAddress] = React.useState("unknown");
  const getIP = React.useCallback(async () => {
    const data = await get("https://ifconfig.me/all.json");
    console.log({ data });
    setIPAddress(data.ip_addr);
  }, []);

  React.useEffect(() => {
    getIP();
  }, [getIP]);
  return (
    <div className={styles.systemSettingContainer}>
      <div className={styles.settingItem}>
        <span className={styles.settingTitle}>IP</span>
        <span>{IPAddress}</span>
      </div>
    </div>
  );
};

export default SystemSettings;
