import { makeAutoObservable } from "mobx";
import { uuid } from "lib/uuid/uuid";
import { LocalStorageKey, localStorageService } from "services/appLocalStorage/localStorageService";
import { TreeEntity } from "../interfaces";
import { createProperty, deleteProperty, findPropertyValue, updateProperty } from "./treeStore.utils";
import { notification } from "antd";

class TreeStore {
    treeEntities: Record<string, TreeEntity> | undefined = undefined;
    activeTreeEntityId: string | undefined = undefined;
    activeTreeEntity: TreeEntity | undefined = undefined;
    editorValueChanged = false;

    constructor() {
        makeAutoObservable(this);
        this.treeEntities = localStorageService
            .getItem<Record<string, TreeEntity>>(LocalStorageKey.TREE_ENTITIES) || {};
    }

    createEntity = (newEntity: TreeEntity | undefined, parentId?: string, newEntityId?: string) => {
        if (newEntity) {
            const entityID = newEntityId || uuid();
            const copiedRecord = { ...this.treeEntities };
            const updatedEntities = createProperty(copiedRecord, entityID, newEntity, parentId);
            this.treeEntities = updatedEntities;
        }
    }

    moveEntity = (entityID: string, newEntity: TreeEntity, parentId: string | undefined) => {
        this.deleteEntity(entityID);
        this.createEntity(newEntity, parentId, entityID);
    }

    updateEntity = (updatedEntity: TreeEntity | undefined, id: string | undefined) => {
        if (id && updatedEntity) {
            const copiedRecord = { ...this.treeEntities };
            const updatedEntities = updateProperty(copiedRecord, id, updatedEntity);
            this.treeEntities = updatedEntities;
        }
    }

    deleteEntity = (id: string) => {
        const copiedRecord = { ...this.treeEntities };
        const updatedEntities = deleteProperty(copiedRecord, id);
        this.treeEntities = updatedEntities;
    }

    resetTree = () => {
        this.activeTreeEntityId = undefined;
        this.treeEntities = {};
        this.activeTreeEntity = undefined;
        this.editorValueChanged = false;
        localStorageService.removeItem(LocalStorageKey.TREE_ENTITIES);
    };

    setActiveTreeEntity = (entityId: string | undefined) => {
        this.activeTreeEntityId = entityId;
        const activeTreeEntity = findPropertyValue(this.treeEntities, entityId);
        this.activeTreeEntity = activeTreeEntity;
    }

    updateActiveEntity = (updatedEntity: TreeEntity) => {
        this.activeTreeEntity = updatedEntity;
    }

    saveTreeEntities = () => {
        localStorageService.setItem(LocalStorageKey.TREE_ENTITIES, this.treeEntities);
        notification.info({message: "Изменения сохранены"});
    }

    cancelTreeEntitiesChanges = () => {
        localStorageService.removeLastItem(LocalStorageKey.TREE_ENTITIES);
        const prevState = localStorageService.getItem<Record<string, TreeEntity>>(LocalStorageKey.TREE_ENTITIES);
        treeStore.treeEntities = prevState;
        notification.info({message: "Последние изменения отменены"});
    }

    resetActiveEntity = () => {
        treeStore.activeTreeEntity = undefined;
        treeStore.activeTreeEntityId = undefined;
    }

    setEditorValueChanged = (isChanged: boolean) => {
        this.editorValueChanged = isChanged;
    }
}

const treeStore = new TreeStore();

export { treeStore };
