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

    private mountedList: EquipamentoResult[];
    private listCount = 0;

    private listEqpResource;
    private translations;
    private limit;

    constructor(
        private templateComponent: TemplateComponent) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.listEqp.currentValue) {
            this.mountList(changes.listEqp.currentValue);
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
            i = 1;
        });
        //console.log("montou lista...");
        this.dataTableOptions();
    }

    reloadEqp(params) {
        this.listEqpResource.query(params).then(item => this.mountedList = item);
    }

    rowClick(rowEvent) {
        this.templateComponent.createDetalhesEquipamento(rowEvent.row.item);
    }

    dataTableOptions() {
        if (this.mountedList) {

            this.listEqpResource = new DataTableResource(this.mountedList);

            //console.log(this.listEqpResource)

            this.listEqpResource.count().then(count => {
                this.listCount = count
                //console.log("Contagem: " + count);
                if (count > 10) {
                    this.limit = 5;
                } else {
                    this.limit = count
                }
                //console.log("Limit: " + this.limit);
            });


            this.translations = <DataTableTranslations>{
                paginationLimit: 'Total por página',
                paginationRange: 'Resultados'
            };

        }
    }


}