import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'equipamento-component',
    templateUrl: 'equipamento.component.html',
    styleUrls: ['equipamento.component.css']
})

export class EquipamentoComponent implements OnInit {

    @Input() equipamento: Equipamento;

    @Input() actived: boolean;

    private status: boolean = false;

    constructor() { }

    ngOnInit() {

    }

}