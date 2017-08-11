import { SipIn } from './../../../../viewmodel/sip/sipin';
import { Sip } from './../../../../viewmodel/sip/sip';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { SipService } from './sip.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sip-set-component',
    templateUrl: 'sip.component.html',
    styleUrls: ['sip.component.css'],
    providers: [SipService, ToastyComponent]
})

export class SipSetComponent implements OnInit {

    private phyref: string = "1";
    private sip: Sip;
    private sipIn: SipIn;
    private btnSipModificar: boolean = true;
    private btnNome: string = "Modificar";
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private sipService: SipService) { }

    ngOnInit() {
        this.getSipDiagnostics();
    }

    getSipDiagnostics() {
        this.searching = true;
        this.sipService.getSipDiagnostics(this.holderService.equipamento, Number(this.phyref))
            .then(data => {
                this.sip = data;
                this.searching = false;
                this.mountSipObject();
                this.btnSipModificar = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", "Erro ao buscar Sip Diagnostics.", "error", 10000);
            });
    }

    mountSipObject() {
        this.sipIn = {
            DirectoryNumber: this.sip.directoryNumber,
            AuthUserName: this.sip.authUserName,
            AuthPassword: this.sip.authPassword,
            ProxyServer: this.sip.proxyServer,
            RegistrarServer: this.sip.registrarServer,
            UserAgentDomain: this.sip.userAgentDomain,
            OutboundProxy: this.sip.outboundProxy,
            phyReferenceList: this.phyref
        }
    }

    setSipDiagnostics() {
        if (this.sip) {
            this.btnSipModificar = true;
            this.btnNome = "Aguarde";
            this.sipService.setSipActivation(this.holderService.equipamento, this.sipIn)
                .then(data => {
                    if (data) {
                        this.btnNome = "Modificar";
                        this.btnSipModificar = false;
                        this.callToasty("Sucesso.", "Sucesso ao executar o comando.", "success", 10000);
                    } else {
                        this.btnNome = "Modificar";
                        this.btnSipModificar = false;
                        this.callToasty("Ops, aconteceu algo.", "Erro ao executar comando Sip.", "error", 10000);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                });
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
}