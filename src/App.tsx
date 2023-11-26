import { Editor } from "components/Editor/Editor";
import { FileExplorer } from "components/FileExplorer/FileExplorer";
import { ResizableWrapper } from "components/ResizableWrapper/ResizableWrapper";

const App = () => (
    <div className="app">
        <ResizableWrapper sidebar={<FileExplorer />} content={<Editor />} />
    </div>
);

export { App };
