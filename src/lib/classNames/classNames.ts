type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    className: string,
    mods: Mods = {},
    additionalClasses: string[] = [],
): string {
    return [
        className,
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className),
        ...additionalClasses.filter(Boolean),
    ].join(" ");
}
