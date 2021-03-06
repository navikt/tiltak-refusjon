import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.less";
import { isDevelopment, setHeaderAndFooter } from "./utils/decorator";

if (isDevelopment()) {
  setHeaderAndFooter();
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
