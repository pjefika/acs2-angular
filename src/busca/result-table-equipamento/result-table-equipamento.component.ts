import { EquipamentoResult } from './../../viewmodel/equipamento/table-result/equipmento-result';
import { TemplateComponent } from './../../template/template.component';
import { ListEqp } from './../../template/mock/mocklisteqp';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { ValidaTipoRedeComponent } from '../valida-tipo-rede/valida-tipo-rede.component';

@Component({
    selector: 'result-table-equipamento',
    templateUrl: 'result-table-equipamento.component.html',
    styleUrls: ['result-table-equipamento.component.css']
})

export class ResulTableEquipamentoComponent implements OnInit, OnChanges {

    @Input() public listEqp: Equipamento[];
    @Input() public showTable: boolean = false;

    private modalopen: boolean = false;

    constructor(
        private templateComponent: TemplateComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        if (this.variavelHolderService.lstEquipamentos) {

        }
    }

    public ngOnChanges(changes: SimpleChanges) {

    }

    public entraeqp(eqp: Equipamento) {
        this.modalopen = true;
        this.variavelHolderService.equipamento = eqp;
    }

    public createTemplateDetalhes() {
        this.templateComponent.createDetalhesEquipamento();
    }

    private escolharede(typer: boolean) {
        this.systemHolderService.isvivoone = typer;
        this.templateComponent.createDetalhesEquipamento();
    }

}