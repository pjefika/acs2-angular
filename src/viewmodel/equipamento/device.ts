import { Firmware } from './firmware';
import { Equipamento } from './equipamento';
export class EquipamentoInfo {
    device: Equipamento;
    online: boolean;
    firmware: Firmware;
}