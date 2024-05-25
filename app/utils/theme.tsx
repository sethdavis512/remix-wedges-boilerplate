export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

const themes: Array<Theme> = Object.values(Theme);

const prefersDarkMQ = '(prefers-color-scheme: dark)';

export const getPreferredTheme = () =>
    window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

export function isTheme(value: unknown): value is Theme {
    return typeof value === 'string' && themes.includes(value as Theme);
}
