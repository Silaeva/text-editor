import { TreeEntity } from "interfaces";

export const deleteProperty = (record: Record<string, TreeEntity> | undefined, deleteId: string) => {
    for (const currentId in record) {
        if (deleteId === currentId) {
            delete record[deleteId];
            break;
        } else if (record[currentId].contentList) {
            deleteProperty(record[currentId].contentList, deleteId);
        }
    }
    return record;
};

export const updateProperty = (record: Record<string, TreeEntity> | undefined, updateId: string, updatedEntity: TreeEntity) => {
    for (const currentId in record) {
        if (updateId === currentId) {
            record[updateId] = updatedEntity;
            break;
        } else if (record[currentId].contentList) {
            updateProperty(record[currentId].contentList, updateId, updatedEntity);
        }
    }
    return record;
};

export const createProperty = (record: Record<string, TreeEntity> | undefined, newId: string, newEntity: TreeEntity, parentId?: string) => {
    if (!parentId) {
        record = { ...record, [newId]: newEntity }
    } else {
        for (const currentId in record) {
            if (parentId === currentId) {
                record[parentId].contentList = { ...record[parentId].contentList, [newId]: newEntity};
                break;
            } else if (record[currentId].contentList) {
                createProperty(record[currentId].contentList, newId, newEntity, parentId);
            }
        }

    }
    return record;
};

export const findPropertyValue = (record: Record<string, TreeEntity> | undefined, searchId: string | undefined): TreeEntity | undefined => {
    if (record && searchId && record[searchId]){
        return record[searchId];
    };

    for (const currentId in record) {
        const contentList = record[currentId].contentList;
        if (contentList) {
            const value = findPropertyValue(contentList, searchId);
            if (value) return value;
        }
    }
    return undefined;
}