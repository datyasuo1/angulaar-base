import { ActionEnum } from 'src/app/shared/AppEnum';

export interface IServerManagement {
    id: number;
    name: string;
    ipAddressPhysical: string;
    status: number;
    statusName?: string;
    virtualMachineQuantity: number;
    ram: number;
    ssd: number;
    vCPU: number;
    hdd: number;
    monitorLink: string;
    virtualMachines?: IVirtualMachine[];
}

export interface IGetServerPayload {
    page: number;
    size: number;
    name: string;
    ipAddress: string;
    monitorLink: string;
}
export interface IServerStatus {
    id: number;
    name: string;
}

export interface IAddUpdateServerPayload {
    name: string;
    ipAddressPhysical: string;
    status: number;
    virtualMachine: string;
    ram: number;
    ssd: number;
    hdd: 0;
    monitorLink: string;
    vcpu: 0;
}

export interface IVirtualMachine {
    id: number;
    name: string;
    vCPU: number;
    ram: number;
    ssd: number;
    hdd: number;
    status: number;
    statusName?: string;
    ipAddress: string;
    monitorLink: string;
}

export interface IGetVirtualMachinePayload {
    serverId: number;
    name: string;
    monitorLink: string;
    ipAddress: string;
}

export interface IAddUpdateVirtualMachinePayload {
    name: string;
    ram: number;
    ssd: number;
    hdd: number;
    ipAddress: string;
    status: number;
    serverId: number;
    vcpu: number;
    monitorLink: string;
}

export interface IAddVirtualMachineConfig {
    virtualMachine: IVirtualMachine;
    action: ActionEnum;
}
