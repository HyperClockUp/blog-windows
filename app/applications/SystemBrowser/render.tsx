import React from "react";
import styles from "./index.css";

const SystemBrowser = () => {
  const showUrl = React.useRef("");
  const [url, setUrl] = React.useState("");

  const urlChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      showUrl.current = e.target.value;
    }, []);

  const confirmUrlHandler = React.useCallback(() => {
    setUrl(showUrl.current);
  }, []);

  return (
    <div className={styles.browserContainer}>
      <script src="https://unpkg.com/@ungap/custom-elements-builtin"></script>
      <script type="module" src="https://unpkg.com/x-frame-bypass"></script>
      <div className={styles.browserHeader}>
        <input
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
        is="x-frame-bypass"
        className={styles.browserContent}
        src={url}
        frameBorder="0"
        title={url}
      ></iframe>
    </div>
  );
};

export default SystemBrowser;
