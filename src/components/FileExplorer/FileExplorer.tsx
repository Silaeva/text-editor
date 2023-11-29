import { observer } from "mobx-react";
import { ModalConfig, ModalMode, TreeEntityType } from "interfaces";

import styles from "./FileExplorer.module.scss";
import { Entity } from "components/Entity/Entity";
import { treeStore } from "store/treeStore";
import { Button, Divider, Tooltip } from "antd";
import { PlusSquareOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { EditingModal } from "components/EditingModal/EditingModal";
import { useState, MouseEvent, useCallback } from "react";

const FileExplorer: React.FC = observer(() => {
    const {
        treeEntities,
        activeTreeEntity,
        activeTreeEntityId,
        saveTreeEntities,
        cancelTreeEntitiesChanges,
        resetActiveEntity,
    } = treeStore;
    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

    const handleModalClose = () => {
        setModalConfig(null);
    };

    const handleSetModalConfig = useCallback((config: ModalConfig) => {
        setModalConfig(config);
    }, []);


    const handleSave = () => {
        saveTreeEntities();
    };

    const handleCancel = () => {
        cancelTreeEntitiesChanges();
    };

    const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setModalConfig({ mode: ModalMode.CREATE, entityId: activeTreeEntityId });
    };

    return (
        <div className={styles.container} onClick={resetActiveEntity}>
            {modalConfig && <EditingModal modalConfig={modalConfig} onClose={handleModalClose} />}
            <div>
                <div className={styles.buttons}>
                    <Tooltip title="Сбросить последние изменения" className={styles.cancelButton}>
                        <Button type="default" onClick={handleCancel}
                            icon={<UndoOutlined />} />
                    </Tooltip>
                    <Tooltip title="Добавить">
                        <Button
                            type="default"
                            onClick={handleCreate}
                            icon={<PlusSquareOutlined />}
                            disabled={activeTreeEntity?.type === TreeEntityType.FILE}
                        />
                    </Tooltip>
                    <Tooltip title="Сохранить все изменения">
                        <Button type="default" onClick={handleSave}
                            icon={<SaveOutlined />} />
                    </Tooltip>
                </div>
                <Divider className={styles.divider} />
            </div>
            {treeEntities &&
                Object.entries(treeEntities).map(([entityId, entity]) => {
                    return (
                        <Entity
                            key={entityId}
                            entityId={entityId}
                            entity={entity}
                            onShowModal={handleSetModalConfig}
                        />
                    );
                })}
        </div>
    );
});

export { FileExplorer };
