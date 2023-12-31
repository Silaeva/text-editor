import {
    MouseEvent, useCallback, useEffect, useRef, useState,
} from "react";
import { isHTMLElement } from "interfaces/index";
import styles from "components/ResizableWrapper/ResizableWrapper.module.scss";
import { classNames } from "lib/classNames/classNames";
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from "./ResizableWrapper.constants";

interface Props {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const ResizableWrapper: React.FC<Props> = ({ sidebar, content }) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);

    const handleStartResizing = (event: MouseEvent) => {
        event.preventDefault();
        setIsResizing(true);
    };

    const handleStopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleResize = useCallback(
        (event: MouseEventInit) => {
            if (isResizing && isHTMLElement(sidebarRef.current) && event.clientX) {
                const sidebarLeftPosition = sidebarRef.current.getBoundingClientRect().left;
                const updatedSidebarWidth = event.clientX - sidebarLeftPosition;
                const isAllowedWidth = updatedSidebarWidth >= MIN_SIDEBAR_WIDTH
                && updatedSidebarWidth <= MAX_SIDEBAR_WIDTH;
                if (isAllowedWidth) {
                    setSidebarWidth(updatedSidebarWidth);
                }
            }
        },
        [isResizing],
    );

    useEffect(() => {
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", handleStopResizing);
        return () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", handleStopResizing);
        };
    }, [handleResize, handleStopResizing]);

    return (
        <div className={styles.container}>
            <div
                ref={sidebarRef}
                className={styles.sidebar}
                style={{ width: sidebarWidth }}
            >
                <div className={styles.sidebarContent} style={{ width: sidebarWidth - 10 }}>{sidebar}</div>
                <div
                    className={classNames(styles.resizer, {}, [isResizing ? styles.resizing : ""])}
                    onMouseDown={handleStartResizing}
                />
            </div>
            <div className={styles.contentContainer}>{content}</div>
        </div>
    );
};

export { ResizableWrapper };
