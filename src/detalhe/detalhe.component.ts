import { EquipamentoResult } from './../viewmodel/equipamento/table-result/equipmento-result';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    styleUrls: ['detalhe.component.css'],
    providers: [DetalheService]
})

export class DetalheComponent extends SuperComponentService implements OnInit {

    public eqpReady: boolean = false;
    public searching: boolean = false;
    public searchWhat: string;
    public eqp: EquipamentoResult;
    public device: EquipamentoInfo;
    @Input() public searchSolo: boolean = false;

    constructor(
        private detalheService: DetalheService,
        public toastyComponent: ToastyComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        if (this.searchSolo) {
            this.eqp = new EquipamentoResult();
            this.eqp.id = this.variavelHolderService.deviceId;
        } else {
            this.eqp = this.variavelHolderService.equipamentoResumo;
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
                this.variavelHolderService.equipamento = this.device.device;
                this.variavelHolderService.checkOnline = this.device.online;
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

    public isModemOrAta() {
        return this.device.device.type === 0 || this.device.device.type === 1;
    }
}