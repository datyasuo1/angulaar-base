export interface IUserGroup {
    id: number;
    groupId?: number;
    name: string;
    description: string;
    isDefault?: boolean;
    status: string;
    dataDomainId: number;
    parentId?: number;
    parentName?: string;
    agencyId: number;
    agencyName: string;
    roleId?: number;
    roleName?: string;
    memberCount: number;
    createdAt: string;
}

export interface IUser {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isActive: boolean;
    fullName?: string;
}
