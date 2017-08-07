import { EquipamentoResult } from './../../viewmodel/equipamento/table-result/equipmento-result';
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
    private listEqpCount: 0;
    private listEqpResource;
    private translations;

    private mountedList: EquipamentoResult[];

    constructor(
        private templateComponent: TemplateComponent) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        //Detecta se variavel mudou e monta as opções da datatable
        if (changes.listEqp.currentValue) {
            this.dataTableOptions(changes.listEqp.currentValue);
        }
    }

    reloadEqp(params) {
        //Deixar pra nao informar erro...
        //this.listEqpResource.query(params).then(eqps => this.mountedList = eqps);
    }

    rowClick(rowEvent) {
        this.templateComponent.createDetalhesEquipamento(rowEvent.row.item);
    }

    dataTableOptions(l) {
        if (l) {
            this.mountList(l);
            this.listEqpResource = new DataTableResource(l);
            this.listEqpResource.count().then(count => this.listEqpCount = count);
            this.translations = <DataTableTranslations>{
                paginationLimit: 'Total por página',
                paginationRange: 'Resultados'
            };
        }
    }

    mountList(l) {
        let lst: EquipamentoResult;
        let i = 0;
        l.forEach(eqp => {
            lst = {
                fabricante: eqp.manufacturer,
                ip: eqp.IPAddress,
                mac: eqp.macAddress,
                serial: eqp.deviceId.serialNumber,
                subscriber: eqp.subscriberID,
                id: eqp.deviceGUID
            }
            if (i === 0) {
                this.mountedList = [lst];
            } else {
                this.mountedList.push(lst);
            }
        });
    }

}