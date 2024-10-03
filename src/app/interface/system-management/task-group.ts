import { ActionEnum } from 'src/app/shared/AppEnum';

export interface ITaskGroup {
    id: number;
    name: string;
    description: string;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface ITaskGroupOptions {
    id: number;
    name: string;
}

export interface ICreateEditTaskGroupPayload {
    name: string;
    sortOrder: number;
    description: string;
}

export interface IGetTaskGroupPayload {
    name: string;
    description: string;
    page: number;
    size: number;
}

export interface ICreateEditTaskGroupConfig {
    taskGroup: ITaskGroup;
    action: ActionEnum;
}
