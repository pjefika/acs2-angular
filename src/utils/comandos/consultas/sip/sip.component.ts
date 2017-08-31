import { Sip } from './../../../../viewmodel/sip/sip';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { SipService } from './sip.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sip-get-component',
    templateUrl: 'sip.component.html',
    styleUrls: ['sip.component.css'],
    providers: [SipService, ToastyComponent]
})

export class SipGetComponent implements OnInit {

    public phyref: number = 1;
    public sip: Sip;
    public btnSip: boolean = false;
    public btnSipModificar: boolean = true;
    public btnNome: string = "Modificar";
    public searching: boolean = false;
    public nomeBtn: string = "Consultar";

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private sipService: SipService) { }

    ngOnInit() {
    }

    public getSipDiagnostics() {
        this.searching = true;
        this.btnSip = true;
        this.nomeBtn = "Aguarde";
        this.sipService.getSipDiagnostics(this.holderService.equipamento, this.phyref)
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
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }
}