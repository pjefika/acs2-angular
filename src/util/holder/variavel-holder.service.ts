import { Injectable } from '@angular/core';
import { Equipamento } from 'viewmodel/equipamento/equipamento';
import { EquipamentoResult } from 'viewmodel/equipamento/table-result/equipmento-result';
import { QueuePicture } from 'viewmodel/acsResponse/queue-picture';

@Injectable()
export class VariavelHolderService {

    public equipamento: Equipamento;

    public lstEquipamentos: Equipamento[];

    public numerodeserie: string;

    public checkOnline: boolean = false;

    public queuePicture: QueuePicture;

    constructor() { }

}