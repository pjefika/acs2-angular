import { ToastyComponent } from './../utils/toasty/toasty.component';
import { HolderService } from './../utils/holder/holder.service';
import { EquipamentoResult } from './../viewmodel/equipamento/table-result/equipmento-result';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    styleUrls: ['detalhe.component.css'],
    providers: [DetalheService, ToastyComponent]
})

export class DetalheComponent implements OnInit {

    private eqpReady: boolean = false;
    private searching: boolean = false;
    private searchWhat: string;
    private eqp: EquipamentoResult;
    private device: EquipamentoInfo;

    constructor(
        private detalheService: DetalheService,
        private injector: Injector,
        private holderService: HolderService,
        private toastyComponent: ToastyComponent) {
        this.eqp = this.injector.get("eqp");
    }

    ngOnInit() {
        this.buscaEqpInd();
    }

    buscaEqpInd() {
        this.searching = true;
        this.eqpReady = false;
        this.searchWhat = "Carregando Equipamento";
        this.detalheService.getDetalhes(this.eqp.id)
            .then(data => {
                this.device = data;
                this.holderService.equipamento = this.device.device;
                this.holderService.checkOnline = this.device.online;
                this.eqpReady = true;
                this.searching = false;
                if (!this.device.online) {
                    this.callToasty("Ops, aconteceu algo.", "Equipamento inativo.", "error", 10000);
                }
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    isModem() {
        return this.device.device.type === 0;
    }
}