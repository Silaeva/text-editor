export const isHTMLElement = (target: Window | HTMLElement | null): target is HTMLElement => {
    const domRect = (target as HTMLElement).getBoundingClientRect();
    return domRect !== undefined;
};

export interface Folder {
    name: string;

}

export enum TreeEntityType {
    FOLDER = "folder",
    FILE = "file",
}
export interface TreeEntity {
    type: TreeEntityType,
    name: string;
    text?: string;
    contentList?: Record<string, TreeEntity>;
}
