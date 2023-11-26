export enum LocalStorageKey {
    TREE_ENTITIES = "treeEntities",
}

export const localStorageService = {
    getItem<T>(key: LocalStorageKey): T | undefined {
        const storageValue = localStorage.getItem(key);
        if (storageValue) {
            return JSON.parse(storageValue);
        }
        return undefined;
    },

    setItem<T>(key: LocalStorageKey, value: T) {
        const storageValue = JSON.stringify(value);
        localStorage.setItem(key, storageValue);
    },

    removeItem(key: LocalStorageKey) {
        localStorage.removeItem(key);
    },
};
