import { ModalConfig, ModalMode, TreeEntity, TreeEntityType } from "interfaces";
import { Dropdown } from "antd";
import { treeStore } from "store/treeStore";
import { observer } from "mobx-react";

interface Props {
    children: React.ReactNode;
    entityId: string;
    entity: TreeEntity;
    onShowModal: (config: ModalConfig) => void
}

const OptionsDropdown: React.FC<Props> = observer(({ children, entityId, entity, onShowModal }) => {
    const { setActiveTreeEntity, activeTreeEntityId, deleteEntity } = treeStore;

    const items = [
        {
            label: "Редактировать",
            key: "Редактировать",
            onClick: () => onShowModal({ mode: ModalMode.EDIT, entity, entityId }),
        },
        {
            label: "Удалить",
            key: "Удалить",
            onClick: () => deleteEntity(entityId),
        },
    ];

    if (entity.type === TreeEntityType.FOLDER) {
        items.unshift({
            label: "Добавить",
            key: "Добавить",
            onClick: () => onShowModal({ mode: ModalMode.CREATE, entityId }),
        });
    }

    const handleDropdownOpen = (isOpen: boolean) => {
        if (isOpen && activeTreeEntityId !== entityId) {
            setActiveTreeEntity(entityId)
        }
    }

    return (
        <Dropdown
            trigger={["contextMenu"]}
            menu={{ items }}
            onOpenChange={handleDropdownOpen}
        >
            {children}
        </Dropdown >
    )
});

export { OptionsDropdown };
