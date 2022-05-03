import "./public-path.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configStore from "./store";
import "./assets/style/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = configStore();

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>, 
//   document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function render(props) {
  const { container } = props;
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  container ? container.querySelector("#root") : document.querySelector("#root"));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
  return await new Promise(resolve => {
    resolve(true);
  });
}

export function mount(props) {
  console.log("[react16] props from main framework", props);
  render(props);
}

export function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector("#root") : document.querySelector("#root"));
}
