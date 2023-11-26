import { ResizableWrapper } from 'components/ResizableWrapper/ResizableWrapper';

const App = () => (
    <div className="app">
        <ResizableWrapper sidebar={(<div>SIDEBAR</div>)} content={(<div>CONTENT</div>)} />
    </div>
);

export { App };
