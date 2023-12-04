import { observer } from "mobx-react";

import { treeStore } from "store/treeStore";
import TextArea from "antd/es/input/TextArea";

import styles from "./Editor.module.scss";
import { Button, Empty } from "antd";
import { TreeEntityType } from "interfaces";

const Editor: React.FC = observer(() => {
    const { activeTreeEntityId, activeTreeEntity, updateEntity, editorValueChanged, setEditorValueChanged, updateActiveEntity } = treeStore;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (activeTreeEntity && activeTreeEntityId) {
            updateActiveEntity({ ...activeTreeEntity, text: event.target.value });
            setEditorValueChanged(true);
        }
    }

    const handleSave = () => {
        updateEntity(activeTreeEntity, activeTreeEntityId);
        setEditorValueChanged(false);
    }

    return (
        <div className={styles.container}>
            {activeTreeEntity?.type === TreeEntityType.FILE && activeTreeEntity.text !== undefined ?
                <div className={styles.editor}>
                    <Button
                        size='small'
                        disabled={!editorValueChanged}
                        type='primary'
                        onClick={handleSave}
                    >
                        Сохранить текст
                    </Button>
                    <TextArea
                        className={styles.textArea}
                        name='text'
                        onChange={handleChange}
                        value={activeTreeEntity?.text || ""}
                    />
                </div>
                : <Empty description={<div className={styles.emptyText}>Выберите или создайте файл для отображения контента</div>} />}
        </div>

    );
});

export { Editor };
