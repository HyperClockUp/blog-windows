import React from "react";
import ReactDOM from "react-dom";

const containerId = "blog-window-message-container";

const InnerMessage = () => {
  return <div>message</div>;
};

const InnerInfo = () => {
  return <div>info</div>;
};

const inject = (element: JSX.Element, timeout = 10000) => {
  return () => {
    console.log("inject");
    const dom = document.createDocumentFragment();
    const container = document.createElement("div");
    container.className = "toast-container";
    dom.appendChild(container);
    ReactDOM.render(element, container);
    document.body.appendChild(dom);
    setTimeout(() => {
      console.log("uninject");
      ReactDOM.unmountComponentAtNode(container);
    }, timeout);
  };
};

const MessageContainer = () => {
  return <div>message</div>;
};

const createMessageContainer = () => {
  if (document.querySelector(`#${containerId}`)) {
    return;
  }
};

const destroyMessageContainer = () => {
  const dom = document.querySelector(`#${containerId}`);
  if (dom) {
    dom.remove();
  }
};

createMessageContainer();

ReactDOM.render(<MessageContainer />, document.querySelector(`#${containerId}`));

const Message = inject(<InnerMessage />);

const Info = inject(<InnerInfo />);

const Toast = {
  Message,
  Info,
};

export default Toast;
