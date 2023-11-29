import React, { ChangeEvent, useEffect, useState } from "react";
import { ModalConfig, ModalMode, TreeEntity, TreeEntityType } from "interfaces";
import { Button, Input, Modal, Select } from "antd";
import { treeStore } from "store/treeStore";
import { observer } from "mobx-react";

import styles from "./EditingModal.module.scss";

interface Props {
    modalConfig: ModalConfig | null;
    onClose: () => void;
}

const TypeToLabel = {
    [TreeEntityType.FILE]: "Файл",
    [TreeEntityType.FOLDER]: "Папка",
}

const selectOptions = [
    {
        value: TreeEntityType.FOLDER,
        label: TypeToLabel[TreeEntityType.FOLDER],
    },
    {
        value: TreeEntityType.FILE,
        label: TypeToLabel[TreeEntityType.FILE],
    },
];

const defaultEntity: TreeEntity = {
    type: undefined,
    name: "",
    text: "",
}

const EditingModal: React.FC<Props> = observer(({ modalConfig, onClose }) => {
    const { updateEntity, createEntity } = treeStore;
    const [editingEntity, setEditingEntity] = useState<TreeEntity | undefined>(modalConfig?.entity || defaultEntity);

    useEffect(() => {
        if (modalConfig?.entity) {
            setEditingEntity(modalConfig.entity)
        }
    }, [modalConfig?.entity]);

    const handleModalOk = () => {
        if (modalConfig?.mode === ModalMode.EDIT) {
            updateEntity(editingEntity, modalConfig.entityId)
        } else {
            createEntity(editingEntity, modalConfig?.entityId);
        }
        onClose();
    }

    const handleTypeChange = (value: TreeEntityType) => {
        setEditingEntity({
            ...editingEntity,
            text: editingEntity?.text || "",
            name: editingEntity?.name || "",
            type: value,
        })
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingEntity({
            ...editingEntity,
            type: editingEntity?.type,
            name: event.target.value.trim(),
        })
    }

    return (
        <Modal
            key={modalConfig?.entityId}
            title={modalConfig?.mode === ModalMode.EDIT ? "Редактирование" : "Добавление"}
            open={!!modalConfig}
            onCancel={onClose}
            footer={(
                <div>
                    <Button type='default' onClick={onClose}>
                        Отменить
                    </Button>
                    <Button
                        disabled={!editingEntity?.type || !editingEntity?.name}
                        type='primary'
                        onClick={handleModalOk}
                    >
                        Сохранить
                    </Button>
                </div>)}
            destroyOnClose
        >
            <div className={styles.modalContent}>
                <Select
                    placeholder="Выберите тип"
                    value={editingEntity?.type}
                    options={selectOptions}
                    onChange={handleTypeChange}
                    disabled={modalConfig?.mode === ModalMode.EDIT}
                />
                <Input
                    name='name'
                    value={editingEntity?.name}
                    onChange={handleNameChange}
                    placeholder='Введите название'
                />
            </div>
        </Modal>
    )
});

export { EditingModal };
