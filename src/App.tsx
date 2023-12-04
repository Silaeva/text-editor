import { Editor } from "components/Editor/Editor";
import { FileExplorer } from "components/FileExplorer/FileExplorer";
import { ResizableWrapper } from "components/ResizableWrapper/ResizableWrapper";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const App = () => (
    <div className="app">
        <ResizableWrapper
            sidebar={
                <DndProvider backend={HTML5Backend}>
                    <FileExplorer />
                </DndProvider>
            }
            content={<Editor />}
        />
    </div>
);

export { App };
