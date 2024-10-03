export interface ThemeList {
    theme: string;
    mode: string;
    alt: string;
    src: string;
    active?: boolean;
}

export interface Status {
    name: string;
    code: string;
}

export interface APIMethod {
    name: string;
    code: string;
}

export interface Platform {
    name: string;
    code: number;
}

export interface Gentle {
    label: string;
    code: string;
}

export interface Logic {
    name: string;
    code: string;
}

export interface ResourceTypeComboBox {
    name: string;
    code: number;
}

export interface RoleTypeComboBox {
    name: string;
    code: string;
}

export interface Address {
    lat: number;
    lng: number;
    address: string;
}

export interface SortObject {
    orderBy: string;
    orderDirection: string;
}
