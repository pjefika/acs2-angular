import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    whoMenuIsActive: string;
    //Alert
    alertOn: boolean = false;
    alertInfo: {
        alertType: string,
        alertMsg: string
    }
    equipamento: Equipamento;

    constructor() { }
}