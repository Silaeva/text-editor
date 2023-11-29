import { FileOutlined, FileUnknownOutlined, FolderFilled, FolderOpenFilled, FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { TreeEntity, TreeEntityType } from "interfaces";

interface Props {
    entity: TreeEntity;
    isOpen: boolean;
}

const EntityIcon: React.FC<Props> = ({ entity, isOpen }) => {
    const { type, contentList = {} } = entity;

    switch (type) {
    case TreeEntityType.FOLDER:
        if (Object.keys(contentList).length) {
            return isOpen ? <FolderOpenFilled /> : <FolderFilled/>
        } else {
            return isOpen ? <FolderOpenOutlined /> : <FolderOutlined />;
        }
    case TreeEntityType.FILE:
        return <FileOutlined />
    default:
        return <FileUnknownOutlined />
    }
};

export { EntityIcon };
