export const isHTMLElement = (target: Window | HTMLElement | null): target is HTMLElement =>
    (target as HTMLElement).getBoundingClientRect() !== undefined;
