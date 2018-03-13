import { EquipamentoResult } from './../../viewmodel/equipamento/table-result/equipmento-result';
import { TemplateComponent } from './../../template/template.component';
import { ListEqp } from './../../template/mock/mocklisteqp';
import { Equipamento } from './../../viewmodel/equipamento/equipamento';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'result-table-equipamento',
    templateUrl: 'result-table-equipamento.component.html',
    styleUrls: ['result-table-equipamento.component.css']
})

export class ResulTableEquipamentoComponent implements OnInit, OnChanges {

    @Input() public listEqp: Equipamento[];
    @Input() public showTable: boolean = false;

    public mountedList: EquipamentoResult[];
    public listCount = 0;

    public listEqpResource;
    public translations;
    public limit;

    constructor(
        private templateComponent: TemplateComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        if (this.variavelHolderService.lstEquipamentos) {
            this.mountedList = this.variavelHolderService.lstEquipamentos;
            this.dataTableOptions();
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.listEqp.currentValue != changes.listEqp.previousValue) {
            this.listEqp = changes.listEqp.currentValue;
            if (this.listEqp) {
                this.mountList(changes.listEqp.currentValue);
            } else {
                this.mountedList = null;
            }
        } else {
            this.mountedList = null;
        }
    }

    public mountList(l) {
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
        this.variavelHolderService.lstEquipamentos = this.mountedList;
        this.dataTableOptions();
    }

    public reloadEqp(params) {
        this.listEqpResource.query(params).then(item => this.mountedList = item);
    }

    public rowClick(rowEvent) {
        this.variavelHolderService.equipamentoResumo = rowEvent.row.item;
        this.templateComponent.createDetalhesEquipamento();
    }

    public dataTableOptions() {
        if (this.mountedList) {
            this.listEqpResource = new DataTableResource(this.mountedList);
            this.listEqpResource.count().then(count => {
                this.listCount = count
                if (count > 10) {
                    this.limit = 5;
                } else {
                    this.limit = count
                }
            });
            this.translations = <DataTableTranslations>{
                paginationLimit: 'Total por página',
                paginationRange: 'Resultados'
            };
        }
    }


}