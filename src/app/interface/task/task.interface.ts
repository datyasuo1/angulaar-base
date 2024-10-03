export class ITask {
    id: string;
    code: string;
    name: string;
    appId: string;
    workflowStatusId: number;
    workflowStatusName: string;
    missionStatusName: string;
    workflowTypeName: string;
    createdAt: string;
    dueAt: string;
    priorityId: number;
    priorityName: string;
    groupAssignedId: number;
    userAssignedId: string;
    monitoringGroupId: number;
    monitoringUserId: string;
    createdBy: string;
    iconPath?: string;
    parentId: string;
}

export interface IGetTaskPayload {
    page: number;
    size: number;
    isGroup: number;
    search: string;
    workflowStatus: number;
    workflowType: string;
    priorityId: number;
    startTimeCreate: string;
    endTimeCreate: string;
    startTimeDone: string;
    endTimeDone: string;
    workflowGroup: number;
    isMonitored: number;
}
export interface ITaskFilter {
    selectedWorkflowTypeId: string;
    selectedPriorityId: number;
    createFromDate: string;
    createToDate: string;
    doneFromDate: string;
    doneToDate: string;
    workflowGroup: number;
    userAssignedId: number;
}

export interface ICreateTaskPayload {
    workflowTypeId: string;
    content: {
        name: string;
        content: string;
        parentId: string;
        workflowType: string;
        workflowStatus: number;
        dueAt: string;
        groupAssignedId: number;
        userAssignedId: string;
        monitoringGroupId: number;
        monitoringUserId: string;
        isReport: number;
        mediaFile?: string;
        sortOrder?: number;
        priorityId: number;
        fieldId?: number;
        type?: string;
        isSubWorkflow: number;
        code?: string;
        workflowGroup: number;
    };
}
