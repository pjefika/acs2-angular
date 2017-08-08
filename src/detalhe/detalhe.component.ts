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
    providers: [DetalheService]
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
        private holderService: HolderService) {
        this.eqp = this.injector.get("eqp");
    }

    ngOnInit() {
        this.buscaEqpInd();
    }

    buscaEqpInd() {
        this.searching = true;
        this.searchWhat = "Carregando Equipamento";
        this.detalheService.getDetalhes(this.eqp.id)
            .then(data => {
                this.device = data;
                this.eqpReady = true;
                this.searching = false;
                if (!this.device.online) {
                    this.callAlert("Equipamento inativo.", "danger")
                }
            }, error => {
                this.searching = false;
                this.callAlert("Erro ao buscar equipamento por favor verifique.", "danger")
            });
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    isModem() {
        return this.device.device.type === 0;
    }
}