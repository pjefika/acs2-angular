import { DeviceId } from './deviceId';
export class Equipamento {
    activated: boolean;
    deviceGUID: number;
    deviceId: DeviceId;
    macAddress: string;
    manufacturer: string;
    model: string;
    modelName: string;
    softwareVersion: string;
    subscriberID: string;
    IPAddress: string;
    firmwareVersion: string;
    type: number;
    lastActivationTime: number
}