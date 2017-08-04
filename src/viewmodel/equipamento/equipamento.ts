export class Equipamento {
    activated: boolean;
    deviceGUID: number;
    deviceId: number;
    macAddress: string;
    manufacturer: string;
    model: string;
    modelName: string;
    softwareVersion: string;
    subscriberID: string;
    ipAddress: string;
    firmwareVersion: string;
    type: string;
    lastActivationTime: {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
    }
}