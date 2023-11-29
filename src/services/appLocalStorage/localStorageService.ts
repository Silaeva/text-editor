export enum LocalStorageKey {
    TREE_ENTITIES = "treeEntities",
}

export const localStorageService = {
    getItem<T>(key: LocalStorageKey): T | undefined {
        const storageValues = localStorage.getItem(key);
        if (storageValues) {
            const parsed = JSON.parse(storageValues);
            if (Array.isArray(parsed)) {
                return parsed[parsed.length - 1];
            }
        }
        return undefined;
    },

    setItem<T>(key: LocalStorageKey, value: T) {
        const storedValues = localStorage.getItem(key);
        if (storedValues) {
            const newValues = [...JSON.parse(storedValues), value];
            localStorage.setItem(key, JSON.stringify(newValues));
        } else {
            localStorage.setItem(key, JSON.stringify([value]));
        }
    },

    removeItem(key: LocalStorageKey) {
        localStorage.removeItem(key);
    },

    removeLastItem(key: LocalStorageKey) {
        const storedValues = localStorage.getItem(key);
        if (storedValues) {
            const parsed = JSON.parse(storedValues);
            if (Array.isArray(parsed)) {
                parsed.pop();
                localStorage.setItem(key, JSON.stringify(parsed));
            }
        }
    },
};
