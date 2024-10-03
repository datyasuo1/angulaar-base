export interface IDeployedSystem {
    id: number;
    name: string;
    domain: string;
    ipAddress: string;
    monitorAppLink: string;
    devDepartment: string;
    operateDepartment: string;
    server: string;
    service: string;
    ram: string;
    vCPU: string;
}

export interface IAddUpdateDeployedSystemPayload {
    name: string;
    domain: string;
    ipAddress: string;
    monitorAppLink: string;
    devDepartment: string;
    operateDepartment: string;
    serverQuantity: string;
    serviceQuantity: string;
    vcpuquantity: string;
    ramQuantity: string;
}

export interface IGetDeployedSystemPayload {
    page: number;
    size: number;
    name: string;
    domain: string;
    ipAddress: string;
    monitorAppLink: string;
}
