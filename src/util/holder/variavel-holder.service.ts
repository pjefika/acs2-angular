import { Injectable } from '@angular/core';
import { Equipamento } from 'viewmodel/equipamento/equipamento';
import { EquipamentoResult } from 'viewmodel/equipamento/table-result/equipmento-result';

@Injectable()
export class VariavelHolderService {

    public equipamento: Equipamento;

    public lstEquipamentos: EquipamentoResult[];

    public equipamentoResumo: EquipamentoResult;

    public deviceId: number;

    public checkOnline: boolean;

    constructor() { }
}