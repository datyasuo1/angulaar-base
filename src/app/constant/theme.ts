import { ThemeList } from 'src/app/interface';

export const lightTheme: ThemeList[] = [
    {
        theme: 'saga-blue',
        mode: 'light',
        alt: 'Saga Blue',
        src: 'assets/layout/images/themes/saga-blue.png',
    },
];

export const darkTheme: ThemeList[] = [
    {
        theme: 'custome-dark-indigo',
        mode: 'dark',
        src: 'assets/layout/images/themes/custome-dark-indio.svg',
        alt: 'custome Dark Indigo',
    },
    {
        theme: 'lara-dark-blue',
        mode: 'dark',
        src: 'assets/layout/images/themes/lara-dark-blue.png',
        alt: 'Lara Dark Blue',
    },
    {
        theme: 'vela-blue',
        mode: 'dark',
        src: 'assets/layout/images/themes/vela-blue.png',
        alt: 'Vela Blue',
    },
    {
        theme: 'arya-blue',
        mode: 'dark',
        src: 'assets/layout/images/themes/arya-blue.png',
        alt: 'Arya Blue',
    },
];

export const DEFAULT_THEME = 'custome-dark-indigo';
