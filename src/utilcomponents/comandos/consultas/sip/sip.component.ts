import { SipIn } from './../../../../viewmodel/sip/sipin';
import { Sip } from './../../../../viewmodel/sip/sip';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { SipService } from './sip.service';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'sip-get-component',
    templateUrl: 'sip.component.html',
    styleUrls: ['sip.component.css'],
    providers: [SipService]
})

export class SipGetComponent extends SuperComponentService implements OnInit {

    public phyref: string = "1";
    public sip: Sip;
    public sipIn: SipIn;
    public searching: boolean = false;
    public btnSip: boolean = false;
    public nomeBtn: string = "Consultar";
    public isModificarSip: boolean = false;
    public btnSipModificar: boolean = true;
    public btnModificarNome: string = "Modificar";

    public loadingMensagem: string = "Buscando Configurações SIP - Não encerre esta janela para não gerar falha no dispositivo. Esta ação pode demorar até 5 minutos dependendo do dispositivo";

    constructor(
        // public activeModal: NgbActiveModal,
        private sipService: SipService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    ngOnInit() {
    }

    public getSipDiagnostics() {
        this.searching = true;
        this.btnSip = true;
        this.nomeBtn = "Aguarde";
        this.systemHolderService.btnIsLoadingAction = true;
        this.sipService.getSipDiagnostics(this.variavelHolderService.equipamento, this.phyref)
            .then(data => {
                this.sip = data;
                this.searching = false;
                this.btnSip = false;
                this.btnSipModificar = false;
                this.nomeBtn = "Consultar";
            }, error => {
                this.searching = false;
                this.btnSip = false;
                this.nomeBtn = "Consultar";
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.systemHolderService.btnIsLoadingAction = false;
            });
    }

    public editarTable() {
        this.isModificarSip = true;
    }

    public setSipDiagnostics() {
        if (this.sip) {
            this.btnSipModificar = true;
            this.btnModificarNome = "Aguarde";
            this.systemHolderService.btnIsLoadingAction = true;
            this.sipService.setSipActivation(this.variavelHolderService.equipamento, this.sipIn)
                .then(data => {
                    if (data) {
                        this.btnModificarNome = "Modificar";
                        this.btnSipModificar = false;
                        this.callToasty("Sucesso.", "Sucesso ao executar o comando.", "success", 10000);
                    } else {
                        this.btnModificarNome = "Modificar";
                        this.btnSipModificar = false;
                        this.callToasty("Ops, aconteceu algo.", "Erro ao executar comando Sip.", "error", 10000);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                })
                .then(() => {
                    this.systemHolderService.btnIsLoadingAction = false;
                });
        }
    }

    public mountSipObject() {
        this.sipIn = {
            directoryNumber: this.sip.directoryNumber,
            authUserName: this.sip.authUserName,
            authPassword: this.splitAuthPassword(this.sip.directoryNumber),
            proxyServer: this.sip.proxyServer,
            registrarServer: this.sip.registrarServer,
            userAgentDomain: this.sip.userAgentDomain,
            outboundProxy: this.sip.outboundProxy,
            phyReferenceList: this.phyref
        }
    }

    private splitAuthPassword(directorynumber): string {
        let splited: string;
        splited = directorynumber.substring(7, 13);
        return splited;
    }
}