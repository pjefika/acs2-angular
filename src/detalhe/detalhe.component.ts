import { EquipamentoResult } from './../viewmodel/equipamento/table-result/equipmento-result';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { BuscaService } from 'busca/busca.service';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    styleUrls: ['detalhe.component.css'],
    providers: [DetalheService, BuscaService]
})

export class DetalheComponent extends SuperComponentService implements OnInit {

    public eqpReady: boolean = false;
    public eqp: Equipamento;

    private waserrorip: boolean = false;

    @Input() public buscarPeloFulltest: boolean = false;

    private searching: boolean = false;

    constructor(
        private detalheService: DetalheService,
        public toastyComponent: ToastyComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        private buscaService: BuscaService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        if (this.buscarPeloFulltest) {
            this.searchinfodevice();
        } else {
            this.especificEqp();
        }
    }

    private especificEqp() {
        this.eqp = this.variavelHolderService.equipamento;
        setTimeout(() => {
            this.eqpReady = true;
        }, 1);
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
        this.systemHolderService.boxnameseewhatissearching = "Validando IP, aguarde...";
        setTimeout(() => {
            this.detalheService
                .validIpIsEqualMock(this.eqp.subscriberID)
                .then(resposta => {
                    this.systemHolderService.isSearchingIp = false;
                    if (resposta.ip_address_v4 == null || resposta.ip_address_v4 == undefined) {
                        this.callToasty("Informativo.", "Não foi possivel validar a autenticação do modem.", "warning", 8000);
                        this.waserrorip = true;
                    } else if (this.eqp.IPAddress === resposta.ip_address_v4) {
                        this.callToasty("Informativo", "Validado IP do modem, está igual, realize um Reboot no modem.", "success", 4000);
                    } else {
                        this.callToasty("Informativo.", "O IP do modem está diferente da autenticação por favor realize um Reboot no modem.", "warning", 8000);
                        this.waserrorip = true;
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                });
        }, 100);
    }

    private validIpIsEqual() {
        this.systemHolderService.isSearchingIp = true;
        this.systemHolderService.boxnameseewhatissearching = "Validando IP, aguarde...";
        this.detalheService
            .validIpIsEqual(this.eqp.macAddress)
            .then(resposta => {
                // this.systemHolderService.isSearchingIp = false;
                if (resposta.ip_address_v4 == null || resposta.ip_address_v4 == undefined) {
                    this.callToasty("Informativo.", "Não foi possivel validar a autenticação do modem.", "warning", 8000);
                    this.waserrorip = true;
                } else if (this.eqp.IPAddress === resposta.ip_address_v4) {
                    this.callToasty("Informativo", "Validado IP do modem, está igual, realize um Reboot no modem.", "success", 4000);
                } else {
                    this.waserrorip = true;
                    this.callToasty("Informativo.", "O IP do modem está diferente da autenticação por favor realize um Reboot no modem.", "warning", 25000);
                }
            }, error => {
                // Informa erro de nao conseguir executar a ação.
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                // this.callToasty("Ops, aconteceu algo.", "Realize um Reboot no modem", "error", 25000);
            })
            .then(() => {
                this.systemHolderService.isSearchingIp = false;
            })
    }

    public searchinfodevice() {
        if (this.waserrorip || this.buscarPeloFulltest) {
            this.systemHolderService.isSearchingIp = true;
            this.systemHolderService.boxnameseewhatissearching = "Buscando informações do modem...";
            let serialToSend: string;
            if (this.buscarPeloFulltest) {
                serialToSend = this.variavelHolderService.numerodeserie;
            } else {
                serialToSend = this.variavelHolderService.equipamento.deviceId.serialNumber;
            }
            this.searching = true;
            this.buscaService
                .getLista("SERIAL", serialToSend)
                .then(resposta => {
                    if (resposta.length === 0) {
                        this.callToasty("Ops, aconteceu algo.", "Modem não esta mais ativo na plataforma por favor reconsulte.", "error", 15000);
                    } else {
                        this.variavelHolderService.equipamento = resposta[0];
                        this.waserrorip = false;
                        this.eqp = this.variavelHolderService.equipamento;
                        this.eqpReady = true;
                        this.systemHolderService.isSearchingIp = false;
                        this.searching = false;
                        this.docheckonline();
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                });
        } else {
            this.docheckonline();
        }
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
        this.systemHolderService.boxnameseewhatissearching = "Validando Modem, aguarde...";
        setTimeout(() => {
            this.detalheService
                .checkOnlineIssueMock()
                .then(resposta => {
                    this.variavelHolderService.checkOnline = resposta;
                })
                .then(() => {
                    if (!this.variavelHolderService.checkOnline) {
                        this.callToasty("Ops, aconteceu algo", "Modem não está ativo", "error", 8000);
                        if (!this.systemHolderService.isvivoone) {
                            this.dovalidipequal();
                        }
                    }
                    this.systemHolderService.isSearchingCheckOnline = false;
                });
        }, 100);
    }

    private checkOnlineIssue() {
        this.systemHolderService.isSearchingCheckOnline = true;
        this.systemHolderService.boxnameseewhatissearching = "Validando Modem, aguarde...";
        this.detalheService
            .checkOnlineIssue(this.eqp)
            .then(resposta => {
                this.variavelHolderService.checkOnline = resposta;
            })
            .then(() => {
                if (!this.variavelHolderService.checkOnline) {
                    this.callToasty("Ops, aconteceu algo", "Modem não está ativo", "error", 8000);
                    if (!this.systemHolderService.isvivoone) {
                        this.dovalidipequal();
                    }
                }
                this.systemHolderService.isSearchingCheckOnline = false;
            });
    }

    public isModemOrAta() {
        return this.eqp.type === 0 || this.eqp.type === 1;
    }
}