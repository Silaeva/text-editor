import { useState, MouseEvent } from "react";
import { ModalConfig, ModalMode, TreeEntity, TreeEntityType } from "interfaces";
import { Dropdown, Tooltip, Typography } from "antd";

import { EntityIcon } from "components/EntityIcon/EntityIcon";
import { treeStore } from "store/treeStore";
import { classNames } from "lib/classNames/classNames";

import styles from "./Entity.module.scss";
import { observer } from "mobx-react";

interface Props {
    entity: TreeEntity;
    entityId: string;
    onShowModal: (config: ModalConfig) => void;
}

const Entity: React.FC<Props> = observer(({ entity, entityId, onShowModal }) => {
    const { setActiveTreeEntity, activeTreeEntityId, deleteEntity } = treeStore;

    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const showInner = entity.contentList && Object.keys(entity.contentList).length > 0 && isFolderOpen;

    const name = `${entity.name}${entity.type === TreeEntityType.FILE ? ".txt" : ""}`;

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

    const handleEntityClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (entity.type === TreeEntityType.FOLDER) {
            setIsFolderOpen(!isFolderOpen);
        }
        if (activeTreeEntityId !== entityId) {
            setActiveTreeEntity(entityId);
        }
    }

    return (
        <div className={styles.container}>
            <Dropdown
                trigger={["contextMenu"]}
                menu={{ items }}
                onOpenChange={handleDropdownOpen}
            >
                <div
                    className={classNames(styles.entity, { [styles.active]: activeTreeEntityId === entityId })}
                    onClick={handleEntityClick}
                >
                    <EntityIcon
                        entity={entity}
                        isOpen={isFolderOpen}
                    />

                    <Typography.Paragraph className={styles.name} ellipsis>
                        <Tooltip title={name} mouseEnterDelay={0.7}>
                            {name}
                        </Tooltip>
                    </Typography.Paragraph>

                </div>
            </Dropdown >

            {showInner && (
                <div className={styles.inner}>
                    {entity.contentList && Object.entries(entity.contentList).map(([id, innerEntity]) => (
                        <Entity
                            key={id}
                            entityId={id}
                            entity={innerEntity}
                            onShowModal={onShowModal}
                        />
                    ))
                    }
                </div>
            )}
        </div>
    )
});

export { Entity };
