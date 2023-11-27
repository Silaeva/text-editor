import { useState } from "react";
import { TreeEntity, TreeEntityType } from "interfaces";
import { Tooltip, Typography } from "antd";

import styles from "./Entity.module.scss";
import { EntityIcon } from "components/EntityIcon/EntityIcon";

interface Props {
    entity: TreeEntity;
    entityId: string;
}

const Entity: React.FC<Props> = ({entity, entityId}) => {
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const handleSetIsOpen = () => setIsFolderOpen(!isFolderOpen);

    const showInner = entity.contentList && Object.keys(entity.contentList).length > 0 && isFolderOpen;

    const name = `${entity.name}${entity.type === TreeEntityType.FILE ? ".txt" : ""}`;

    return (
        <div className={styles.container} key={entityId}>
            <div className={styles.entity}>
                <EntityIcon
                    entity={entity}
                    isOpen={isFolderOpen}
                    onClick={handleSetIsOpen}
                />

                <Typography.Paragraph className={styles.name} ellipsis>
                    <Tooltip title={entity.name} mouseEnterDelay={0.7}>
                        {name}
                    </Tooltip>
                </Typography.Paragraph>

            </div>

            {showInner && (
                <div className={styles.inner}>
                    {entity.contentList && Object.entries(entity.contentList).map(([id, innerEntity]) => (
                        <Entity
                            key={id}
                            entityId={id}
                            entity={innerEntity}
                        />
                    ))
                    }
                </div>
            )}
        </div>
    )
};

export { Entity };
