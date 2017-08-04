import { TemplateComponent } from './../../template/template.component';
import { ListEqp } from './../../template/mock/mocklisteqp';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-2-data-table';

@Component({
    selector: 'result-table-equipamento',
    templateUrl: 'result-table-equipamento.component.html',
    styleUrls: ['result-table-equipamento.component.css']
})

export class ResulTableEquipamentoComponent implements OnInit, OnChanges {

    @Input() listEqp: Equipamento[];
    private listaMontada: Equipamento[];
    private listEqpCount: 0;
    private listEqpResource;
    private translations;

    constructor(
        private templateComponent:TemplateComponent) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        //Detecta se variavel mudou e monta as opções da datatable
        if (changes.listEqp.currentValue) {
            this.dataTableOptions(changes.listEqp.currentValue);
        }
    }

    reloadEqp(params) {
        this.listEqpResource.query(params).then(eqps => this.listaMontada = eqps);
    }

    rowClick(rowEvent) {
        this.templateComponent.createDetalhesEquipamento(rowEvent.row.item);
    }

    dataTableOptions(l) {
        if (l) {
            this.listEqpResource = new DataTableResource(this.listEqp);
            this.listEqpResource.count().then(count => this.listEqpCount = count);
            this.listaMontada = l;
            this.translations = <DataTableTranslations>{
                paginationLimit: 'Total por página',
                paginationRange: 'Resultados'
            };
        }
    }

}