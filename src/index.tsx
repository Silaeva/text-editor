import { render } from "react-dom";
import { App } from "./App";
import "styles/index.scss";
import ErrorBoundary from "providers/errorBoundary/ErrorBoundary";

render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById("root")
);
