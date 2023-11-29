import { observer } from "mobx-react";

import { treeStore } from "store/treeStore";
import TextArea from "antd/es/input/TextArea";

import styles from "./Editor.module.scss";
import { Button, Empty } from "antd";
import { TreeEntityType } from "interfaces";

const Editor: React.FC = observer(() => {
    const { activeTreeEntityId, activeTreeEntity, updateEntity, editorValueChanged } = treeStore;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (activeTreeEntity && activeTreeEntityId) {
            treeStore.activeTreeEntity = { ...activeTreeEntity, text: event.target.value };
            treeStore.editorValueChanged = true;
        }
    }

    const handleSave = () => {
        updateEntity(activeTreeEntity, activeTreeEntityId);
        treeStore.editorValueChanged = false;
    }

    return (
        <div className={styles.container}>
            {activeTreeEntity?.type === TreeEntityType.FILE && activeTreeEntity.text !== undefined ?
                <div className={styles.editor}>
                    <TextArea
                        className={styles.textArea}
                        name='text'
                        onChange={handleChange}
                        value={activeTreeEntity?.text || ""}
                    />
                    <Button
                        size='small'
                        disabled={!editorValueChanged}
                        type='default'
                        onClick={handleSave}
                    >
                        Сохранить текст
                    </Button>
                </div>
                : <Empty description={<div className={styles.emptyText}>Выберите или создайте файл для отображения контента</div>} />}
        </div>

    );
});

export { Editor };
