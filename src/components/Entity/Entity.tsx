import { useState, MouseEvent, useRef } from "react";
import { ModalConfig, TreeEntity, TreeEntityType } from "interfaces";
import { Tooltip, Typography } from "antd";

import { EntityIcon } from "components/EntityIcon/EntityIcon";
import { treeStore } from "store/treeStore";
import { classNames } from "lib/classNames/classNames";

import styles from "./Entity.module.scss";
import { observer } from "mobx-react";
import { useDrag, useDrop } from "react-dnd";
import { OptionsDropdown } from "components/OptionsDropdown/OptionsDropdown";

interface Props {
    entity: TreeEntity;
    entityId: string;
    onShowModal: (config: ModalConfig) => void;
}

const Entity: React.FC<Props> = observer(({ entity, entityId, onShowModal }) => {
    const { setActiveTreeEntity, activeTreeEntityId, moveEntity } = treeStore;
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const dndRef = useRef<HTMLDivElement>(null);

    const [{ droppedEntity, droppedEntityId, isDragging }, drag] = useDrag(() => ({
        type: TreeEntityType.FILE,
        item: { droppedEntityId: entityId, droppedEntity: entity },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<{ parentId: string, parentEntity: TreeEntity }>();
            const parentId = dropResult?.parentId;
            const parentEntity = dropResult?.parentEntity;
            const { droppedEntity, droppedEntityId } = item;
            if (parentEntity?.type === TreeEntityType.FOLDER && droppedEntityId !== parentId) {
                moveEntity(droppedEntityId, droppedEntity, parentId);
            }
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
            droppedEntity: entity,
            droppedEntityId: entityId,
        }),
    }), [entityId, entity]);

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: [TreeEntityType.FOLDER, TreeEntityType.FILE],
            drop: () => {
                return { parentId: entityId, parentEntity: entity };
            },
            canDrop: () => entity.type === TreeEntityType.FOLDER,
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [entity, entityId, droppedEntity, droppedEntityId]
    );

    const showInner = entity.contentList && Object.keys(entity.contentList).length > 0 && isFolderOpen;

    const name = `${entity.name}${entity.type === TreeEntityType.FILE ? ".txt" : ""}`;

    const handleEntityClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (entity.type === TreeEntityType.FOLDER) {
            setIsFolderOpen(!isFolderOpen);
        }
        if (activeTreeEntityId !== entityId) {
            setActiveTreeEntity(entityId);
        }
    }

    drag(drop(dndRef));

    return (
        <div className={classNames(styles.container, { [styles.isDragging]: isDragging })} >
            <div ref={dndRef}>
                <OptionsDropdown
                    entityId={entityId}
                    entity={entity}
                    onShowModal={onShowModal}
                >
                    <div
                        className={classNames(styles.entity, {
                            [styles.active]: activeTreeEntityId === entityId,
                            [styles.dropOk]: isOver && canDrop,
                            [styles.dropWarning]: isOver && !canDrop,
                        })}
                        onClick={handleEntityClick}
                    >
                        <EntityIcon
                            entity={entity}
                            isOpen={isFolderOpen}
                        />

                        <Typography.Paragraph className={styles.name} ellipsis>
                            <Tooltip title={!isDragging && name} mouseEnterDelay={0.7}>
                                {name}
                            </Tooltip>
                        </Typography.Paragraph>

                    </div>
                </OptionsDropdown >
            </div>
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
        </ div>
    )
});

export { Entity };
