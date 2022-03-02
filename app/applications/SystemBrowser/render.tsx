import React from "react";
// import "./x-frame-bypass";
import styles from "./index.css";

const SystemBrowser = () => {
  const defaultUrl = "https://www.baidu.com/";
  const showUrl = React.useRef(defaultUrl);
  const [url, setUrl] = React.useState(`https://www.www3.workers.dev/-----${defaultUrl}`);

  const urlChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      showUrl.current = e.target.value;
    }, []);

  const confirmUrlHandler = React.useCallback(() => {
    setUrl(`https://www.www3.workers.dev/-----${showUrl.current}`);
  }, []);

  return (
    <div className={styles.browserContainer}>
      <div className={styles.browserHeader}>
        <input
          defaultValue={showUrl.current}
          className={styles.browserUrlInput}
          type="text"
          onChange={urlChangeHandler}
          onFocus={() => {
            setUrl("");
          }}
          onBlur={() => {
            setUrl(showUrl.current);
          }}
        />
        <button onClick={confirmUrlHandler}>转到</button>
      </div>
      <iframe
        // is="x-frame-bypass"
        className={styles.browserContent}
        src={`https://www.www3.workers.dev/`}
        frameBorder="0"
        title={url}
      ></iframe>
    </div>
  );
};

export default SystemBrowser;
