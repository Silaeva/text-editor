import { makeAutoObservable } from "mobx";
import { uuid } from "lib/uuid/uuid";
import { LocalStorageKey, localStorageService } from "services/appLocalStorage/localStorageService";
import { TreeEntity } from "../interfaces";

class TreeStore {
    treeEntities: Record<string, TreeEntity> = {};
    activeTreeEntityId: string | undefined;

    constructor() {
        makeAutoObservable(this);
        this.treeEntities = localStorageService
            .getItem<Record<string, TreeEntity>>(LocalStorageKey.TREE_ENTITIES) || {};
    }

    getEntity = () => {
        if (this.activeTreeEntityId) {
            return this.treeEntities[this.activeTreeEntityId];
        }
    }

    addEntity = (entity: TreeEntity) => {
        const entityID = uuid();
        this.treeEntities[entityID] = entity;
    }

    updateEntity = (entity: TreeEntity) => {
        if (this.activeTreeEntityId) {
            this.treeEntities[this.activeTreeEntityId] = entity;
        }
    }

    deleteEntity = () => {
        if (this.activeTreeEntityId) {
            const updatedEntities = { ...this.treeEntities };
            delete updatedEntities[this.activeTreeEntityId];
            this.treeEntities = updatedEntities;
        }
    }

    saveTree = () => {
        localStorageService.setItem(LocalStorageKey.TREE_ENTITIES, this.treeEntities);
    }

    resetTree = () => {
        this.activeTreeEntityId = undefined;
        this.treeEntities = {};
        localStorageService.removeItem(LocalStorageKey.TREE_ENTITIES);
    };
}

const treeStore = new TreeStore();

export { treeStore };
