import { IAgencyGroup } from '../category/agency.interface';

export interface IAppResourceManagement {
    id: number;
    name: string;
    groupAppId: string;
    groupAppName: string;
    description: string;
    attachFileMobile: string;
    attachFileWeb: string;
    parentId: string;
}

export interface IUpdateAppResourcePayload {
    name: string;
    groupAppId: string;
    description: string;
    attachFileMobile: string;
    attachFileWeb: string;
    applicationResourceVersionDTOS: string;
    applicationResourceGroupUserDTOS: string;
}

export interface ICreateAppResourcePayload {
    name: string;
    groupAppId: string;
    description: string;
    attachFileMobile: string;
    attachFileWeb: string;
    parentId: string;
    applicationResourceVersionDTOS: string;
    applicationResourceGroupUserDTOS: string;
}

export interface IAppResourceGroup {
    id: number;
    name: string;
}

export interface IAppResourceStatus {
    id: number;
    name: string;
}
export interface IAppResourceCategory {
    id: number;
    name: string;
    isWebCategory: boolean;
}

export interface ICreateResouceVersionPayload {
    name: string;
    description: string;
    appCategoryId: number;
    url: string;
    appStatusId: number;
    appResourceId: number;
    nowVersion: boolean;
    webVersion: boolean;
}
export interface IResourcesVersion {
    id: number;
    name: string;
    description: string;
    appCategoryId: number;
    url: string;
    appStatusId: number;
    categoryName: string;
    statusName: string;
    appResourceId: number;
    isNowVersion: number | boolean;
    isWebVersion?: number;
    androidPackageName?: string;
    iosUrl?: string;
    appstoreLink?: string;
    parameters;
}
export interface ICreateUpdateResouceVersion {
    name: string;
    description: string;
    appCategoryId: number;
    url: string;
    appStatusId: number;
    appResourceId: number;
    isNowVersion: true;
    isWebVersion: true;
    androidPackageName?: string;
    iosUrl?: string;
    appstoreLink?: string;
    parameters: string[];
}

export interface IResourceGroupUser {
    groupUserId: number;
    appResourceId: number;
    groupUserName: string;
    agencyId: number;
    id: number;
}

export interface IAddResouceGroupPayload {
    groupUserId: string;
    appResourceId: number;
}

export interface IAppResouceDetail {
    id: number;
    name: string;
    groupAppId: string;
    groupAppName: string;
    description: string;
    attachFileMobile: File | undefined;
    attachFileWeb: File | undefined;
    iconWebName: string;
    iconMobileName: string;
    groupApp: IGroupApp[];
    webVersions: IResourcesVersion[];
    appVersions: IResourcesVersion[];
    appGroupUsers: IResourceGroupUser[];
    imageHost: string;
}

export interface IGroupApp {
    id: number;
    name: string;
}
