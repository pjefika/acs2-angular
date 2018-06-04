import { DetalheComponent } from './../detalhe.component';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, Input } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'equipamento-component',
    templateUrl: 'equipamento.component.html',
    styleUrls: ['equipamento.component.css']
})

export class EquipamentoComponent implements OnInit {

    @Input() equipamento: Equipamento;

    public status: boolean = false;

    constructor(private detalheComponent: DetalheComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        this.checkondeline();
    }

    private validip() {
        this.detalheComponent.dovalidipequal();
    }

    private checkondeline() {
        this.detalheComponent.docheckonline();
    }

    private searchinfodevice() {
        this.detalheComponent.searchinfodevice();
    }

}