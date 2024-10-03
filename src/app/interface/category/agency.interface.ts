export interface IAgency {
    id: number;
    name: string;
    description: string;
    parentId: number;
    parentName: string;
    isActive: number;
    isDeleted: number;
    wardCode: string;
    wardName: string;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
    agencyFields: number[];
}

export interface IAgencyGroup {
    id: number;
    name: string;
    description: string;
    isDefault: any;
    status: string;
    dataDomainId: any;
    parentId: any;
    agencyId: number;
    roleId: number;
    children: any[];
    groupId?: number;
}
