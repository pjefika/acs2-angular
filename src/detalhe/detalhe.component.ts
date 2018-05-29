import { EquipamentoResult } from './../viewmodel/equipamento/table-result/equipmento-result';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit } from '@angular/core';
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
    public eqp: Equipamento;

    constructor(
        private detalheService: DetalheService,
        public toastyComponent: ToastyComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.especificEqp();
    }

    private especificEqp() {
        this.eqp = this.variavelHolderService.equipamento;
        setTimeout(() => {
            this.eqpReady = true;
        }, 100);
    }

    public dovalidipequal() {
        if (this.systemHolderService.ableMock) {
            this.validIpIsEqualMock();
        } else {
            this.validIpIsEqual();
        }
    }

    private validIpIsEqualMock() {
        this.systemHolderService.isSearchingIp = true;
        setTimeout(() => {
            this.detalheService
                .validIpIsEqualMock(this.eqp.subscriberID)
                .then(resposta => {
                    this.systemHolderService.isSearchingIp = false;
                    if (resposta.ip_address_v4 == null || resposta.ip_address_v4 == undefined) {
                        this.callToasty("Informativo.", "Não foi possivel validar a autenticação do modem.", "warning", 8000);
                    } else if (this.eqp.IPAddress === resposta.ip_address_v4) {
                        this.checkOnlineIssue();
                    } else {
                        this.callToasty("Informativo.", "O IP do modem está diferente da autenticação por favor realize um Reboot no modem.", "warning", 8000);
                    }
                }, error => {
                    // Informa erro de nao conseguir executar a ação.
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                    // this.callToasty("Ops, aconteceu algo.", "Realize um Reboot no modem", "error", 25000);
                });
        }, 5000);
    }

    private validIpIsEqual() {
        this.systemHolderService.isSearchingIp = true;
        this.detalheService
            .validIpIsEqual(this.eqp.macAddress)
            .then(resposta => {
                this.systemHolderService.isSearchingIp = false;
                if (resposta.ip_address_v4 == null || resposta.ip_address_v4 == undefined) {
                    this.callToasty("Informativo.", "Não foi possivel validar a autenticação do modem.", "warning", 8000);
                } else if (this.eqp.IPAddress === resposta.ip_address_v4) {
                    this.checkOnlineIssue();
                } else {
                    this.callToasty("Informativo.", "O IP do modem está diferente da autenticação por favor realize um Reboot no modem.", "warning", 25000);
                }
            }, error => {
                // Informa erro de nao conseguir executar a ação.
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                // this.callToasty("Ops, aconteceu algo.", "Realize um Reboot no modem", "error", 25000);
            });
    }

    public docheckonline() {
        if (this.systemHolderService.ableMock) {
            this.checkOnlineIssueMock();
        } else {
            this.checkOnlineIssue();
        }
    }

    private checkOnlineIssueMock() {
        this.systemHolderService.isSearchingCheckOnline = true;
        setTimeout(() => {
            this.detalheService
                .checkOnlineIssueMock(this.eqp.deviceGUID)
                .then(resposta => {
                    this.variavelHolderService.checkOnline = resposta;
                    this.systemHolderService.ablestatusmodem = true;
                })
                .then(() => {
                    this.systemHolderService.isSearchingCheckOnline = false;
                });
        }, 5000);
    }

    private checkOnlineIssue() {
        this.systemHolderService.isSearchingCheckOnline = true;
        this.detalheService
            .checkOnlineIssue(this.eqp)
            .then(resposta => {
                this.variavelHolderService.checkOnline = resposta;
                this.systemHolderService.ablestatusmodem = true;
            })
            .then(() => {
                this.systemHolderService.isSearchingCheckOnline = false;
            });
    }

    public isModemOrAta() {
        return this.eqp.type === 0 || this.eqp.type === 1;
    }
}