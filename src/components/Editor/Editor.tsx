import { observer } from "mobx-react";

import { treeStore } from "store/treeStore";
import TextArea from "antd/es/input/TextArea";

import styles from "./Editor.module.scss";
import { Empty } from "antd";

const Editor: React.FC= observer(() => {
    const { getEntity, updateEntity } = treeStore;
    const activeTreeEntity = getEntity();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (activeTreeEntity) {
            updateEntity({ ...activeTreeEntity, text: event.target.value })
        }
    }

    return (
        <div className={styles.container}>
            {activeTreeEntity ?
                <TextArea
                    onChange={handleChange}
                    style={{width:"100%", height: "100%", whiteSpace: "pre-wrap" }}
                    value={activeTreeEntity?.text || ""}
                />
                : <Empty description={<div className={styles.emptyText}>Выберите или создайте файл для отображения контента</div> }/>}
        </div>
    );
});

export { Editor };
