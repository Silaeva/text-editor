import { createRoot } from "react-dom/client";
import { App } from "./App";
import "styles/index.scss";
import ErrorBoundary from "providers/errorBoundary/ErrorBoundary";

const elementRoot = document.getElementById("root");
if (elementRoot) {
    const root = createRoot(elementRoot);
    root.render(<ErrorBoundary>
        <App />
    </ErrorBoundary>);
}