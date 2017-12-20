import { EquipamentoResult } from './../../viewmodel/equipamento/table-result/equipmento-result';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    public whoMenuIsActive: string;
    //Alert
    public alertOn: boolean = false;
    public alertInfo: {
        alertType: string,
        alertMsg: string
    }
    public equipamento: Equipamento;

    public checkOnline: boolean;

    public lstEquipamentos: EquipamentoResult[];

    public equipamentoResumo: EquipamentoResult;

    constructor() { }
}