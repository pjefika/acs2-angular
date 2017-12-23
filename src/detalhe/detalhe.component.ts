import { ToastyComponent } from './../utils/toasty/toasty.component';
import { HolderService } from './../utils/holder/holder.service';
import { EquipamentoResult } from './../viewmodel/equipamento/table-result/equipmento-result';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    styleUrls: ['detalhe.component.css'],
    providers: [DetalheService, ToastyComponent]
})

export class DetalheComponent implements OnInit {

    public eqpReady: boolean = false;
    public searching: boolean = false;
    public searchWhat: string;
    public eqp: EquipamentoResult;
    public device: EquipamentoInfo;
    @Input() public searchSolo: boolean = false;

    constructor(
        private detalheService: DetalheService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) {
    }

    public ngOnInit() {
        if (this.searchSolo) {
            this.eqp = new EquipamentoResult();
            this.eqp.id = this.holderService.deviceId;
        } else {
            this.eqp = this.holderService.equipamentoResumo;
        }

        this.buscaEqpInd();
    }

    public buscaEqpInd() {
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

    public callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    public callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    public isModem() {
        return this.device.device.type === 0;
    }
}