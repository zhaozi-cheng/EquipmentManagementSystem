export interface Device {
    id: number;               // 内部编号
    category: string;         // 设备类别
    name: string;             // 设备名称
    model: string;            // 型号
    specification: string;    // 规格
    price: number;            // 单价
    purchaseDate: string;     // 购置日期
    manufacturer: string;     // 生产厂家
    purchaser: string;        // 购买人
    status: 'normal' | 'repairing' | 'scrapped'; // 设备状态
    createdAt: string;
    updatedAt: string;
}

export interface DeviceRepair {
    id: string;
    deviceId: string;
    repairDate: string;
    repairCompany: string;
    cost: number;
    responsiblePerson: string;
    description: string;
    createdAt: string;
}

export interface DeviceScrap {
    id: string;
    deviceId: string;
    scrapDate: string;
    reason: string;
    responsiblePerson: string;
    approvalPerson: string;
    createdAt: string;
}

export interface PurchaseRequest {
    id: string;
    deviceName: string;
    model: string;
    specification: string;
    quantity: number;
    estimatedPrice: number;
    reason: string;
    requester: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}



export {};