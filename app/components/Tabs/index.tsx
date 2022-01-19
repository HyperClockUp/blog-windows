import React from "react";
import styles from "./index.css";
import { classNameJoiner } from "../../utils";

export interface Tab {
  id: string | number;
  title?: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  keepAlive?: boolean;
  activeTabId?: Tab["id"];
  render?: (tabId: Tab["id"]) => JSX.Element;
  onChangeTab?: (tabId: Tab["id"]) => void;
  defaultActiveTab?: Tab["id"];
  hideHeader?: boolean;
  animated?: boolean | "slide";
  width?: number;
}

const Tabs = (props: TabsProps) => {
  const {
    tabs,
    render,
    onChangeTab,
    hideHeader,
    activeTabId,
    animated,
    width = 300,
  } = props;

  const [curTabId, setCurTabId] = React.useState<Tab["id"]>(tabs[0]?.id);

  const curTabContentMemo = React.useMemo(() => {
    const targetTab = tabs.find((tab) => tab.id === curTabId);
    const renderContent = render ? render(curTabId) : targetTab?.content;
    return (
      <div
        key={curTabId}
        className={classNameJoiner(
          styles.contentContainer,
          animated && styles.slideAnimation
        )}
      >
        {renderContent}
      </div>
    );
  }, [curTabId, render, tabs, animated]);

  const TabContentListMemo = React.useMemo(() => {
    let renderContent: React.ReactNode[] = [];
    if (render) {
      renderContent = tabs.map((tab) => (
        <div key={tab.id} className={styles.contentContainer} style={{ width }}>
          {render(tab.id)}
        </div>
      ));
    } else {
      renderContent = tabs.map((tab) => (
        <div key={tab.id} className={styles.contentContainer} style={{ width }}>
          {tab.content}
        </div>
      ));
    }
    const leftOffset = tabs.findIndex((tab) => tab.id === curTabId) * -width;
    return (
      <div className={styles.totalContentContainer} style={{ width }}>
        <div
          className={styles.totalContentListWrapper}
          style={{ left: leftOffset }}
        >
          {renderContent}
        </div>
      </div>
    );
  }, [curTabId, render, tabs, width]);

  const renderContent = React.useMemo(() => {
    if (animated === true) {
      return TabContentListMemo;
    } else {
      return curTabContentMemo;
    }
  }, [animated, curTabContentMemo, TabContentListMemo]);

  const tabClickHandler = React.useCallback((tab: Tab) => {
    setCurTabId(tab.id);
  }, []);

  React.useEffect(() => {
    if (!onChangeTab) {
      return;
    }
    onChangeTab(curTabId);
  }, [curTabId, onChangeTab]);

  React.useEffect(() => {
    if (activeTabId === undefined) {
      return;
    }
    setCurTabId(activeTabId);
  }, [activeTabId]);

  const headerMemo = React.useMemo(() => {
    if (hideHeader) {
      return null;
    }
    return (
      <header className={styles.tabsHeader}>
        {tabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className={classNameJoiner(
                styles.tabHeaderItem,
                tab.id === curTabId && styles.activeTabHeaderItem
              )}
              onClick={() => {
                tabClickHandler(tab);
              }}
            >
              {tab.title}
            </div>
          );
        })}
      </header>
    );
  }, [curTabId, hideHeader, tabs, tabClickHandler]);

  return (
    <div className={styles.tabsContainer}>
      {headerMemo}
      <div className={styles.tabsBody}>{renderContent}</div>
    </div>
  );
};

export default Tabs;
