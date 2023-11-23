import { render } from "react-dom";
import { App } from "./app/App";
import "app/styles/index.scss";
import ErrorBoundary from "app/providers/errorBoundary/ui/ErrorBoundary";

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
