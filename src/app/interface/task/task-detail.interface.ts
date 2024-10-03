export interface ITaskDetail {
    id: string;
    code: string;
    name: string;
    appId: string;
    workflowTypeName: string;
    priorityName: string;
    createdAt: string;
    workflowStatusId: number;
    workflowStatusName: string;
    dueAt: string;
    isSubWorkflow: boolean;
    createdFullName: string;
    groupAssignedName: string;
    userAssignedName: string;
    groupMonitoringName: string;
    usersMonitoringName: string;
    content: string;
    parentId: string;
    parentCode: string;
    parentName: string;
    isReport: boolean;
    mediaFile: MediaFile[];
    mediaHost: string;
    missions: IMission[];
    subWorkflow: ISubWorkflow[];
    workflowTimelines: WorkflowTimeline[];
}

export interface MediaFile {
    etag: string;
    path: string;
    fileName: string;
    versionId: string;
}

export interface WorkflowTimeline {
    id: string;
    workflowId: string;
    content: string;
    extraContent: any;
    elementName: string;
    reason: string;
    reasonReject: string;
    dueAt?: string;
    groupAssignedId?: number;
    groupAssignedName: string;
    userAssignedId: string;
    userAssignedName: string;
    monitoringGroupId: string;
    groupMonitoringName: string;
    monitoringUserId: string;
    usersMonitoringName: string;
    updatedBy: string;
    updatedByName: string;
    createdAt: string;
    updatedAt: string;
    mediaFile: string;
}
export interface ISubWorkflow {}

export interface IMission {}
