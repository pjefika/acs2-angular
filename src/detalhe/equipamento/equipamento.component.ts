import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'equipamento-component',
    templateUrl: 'equipamento.component.html',
    styleUrls: ['equipamento.component.css']
})

export class EquipamentoComponent implements OnInit {

    @Input() equipamento: Equipamento;

    private status: boolean = false;

    constructor() { }

    ngOnInit() {
        //console.log(this.equipamento)
    }

    formDate() {

        let date = this.equipamento.lastActivationTime.day + "/" + + this.equipamento.lastActivationTime.month + "/" + this.equipamento.lastActivationTime.year + " " +
            this.equipamento.lastActivationTime.hour + ":" + this.equipamento.lastActivationTime.minute + ":" + this.equipamento.lastActivationTime.second;

        return date;

    }
}