import { DetalheComponent } from './../detalhe.component';
import { HolderService } from './../../utils/holder/holder.service';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'equipamento-component',
    templateUrl: 'equipamento.component.html',
    styleUrls: ['equipamento.component.css']
})

export class EquipamentoComponent implements OnInit {

    @Input() equipamento: Equipamento;

    public status: boolean = false;

    constructor(
        public holderService: HolderService,
        private detalheComponent: DetalheComponent) { }

    ngOnInit() {

    }

    busca() {
        this.detalheComponent.buscaEqpInd();
    }

}