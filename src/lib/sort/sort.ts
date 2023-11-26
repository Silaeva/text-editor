export const sortAlphabetically = (a: string, b: string) => {
    const valA = a.toLowerCase();
    const valB = b.toLowerCase();

    if (valA < valB) return -1;
    if (valA > valB) return 1;

    return 0;
};
