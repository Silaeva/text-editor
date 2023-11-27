import { FileOutlined, FileUnknownOutlined, FolderFilled, FolderOpenFilled, FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { TreeEntity, TreeEntityType } from "interfaces";

interface Props {
   entity: TreeEntity;
    isOpen: boolean;
    onClick: () => void;
}

const EntityIcon: React.FC<Props> = ({entity, isOpen, onClick}) => {
    const {type, contentList = {}} = entity;

    switch (type) {
    case TreeEntityType.FOLDER:
        if (Object.keys(contentList).length) {
            return isOpen ? <FolderOpenFilled onClick={onClick}/> : <FolderFilled onClick={onClick} />
        } else {
            return isOpen ? <FolderOpenOutlined onClick={onClick} /> : <FolderOutlined onClick={onClick} />;
        }
    case TreeEntityType.FILE:
        return <FileOutlined />
    default:
        return <FileUnknownOutlined />
    }
};

export { EntityIcon };
