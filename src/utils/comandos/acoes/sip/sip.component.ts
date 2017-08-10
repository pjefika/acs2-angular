import { Sip } from './../../../../viewmodel/sip/sip';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { SipService } from './sip.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sip-component',
    templateUrl: 'sip.component.html',
    styleUrls: ['sip.component.css'],
    providers: [SipService, ToastyComponent]
})

export class SipComponent implements OnInit {

    private phyref: number = 1;
    private sip: Sip;
    private btnSip: boolean = false;
    private btnSipModificar: boolean = true;
    private btnNome: string = "Modificar";
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private sipService: SipService) { }

    ngOnInit() {
    }

    getSipDiagnostics() {
        this.searching = true;
        this.btnSip = true;
        this.sipService.getSipDiagnostics(this.holderService.equipamento, this.phyref)
            .then(data => {
                this.sip = data;
                this.searching = false;
                this.btnSip = false;
                this.btnSipModificar = false;
            }, error => {
                this.searching = false;
                this.btnSip = false;
                this.callToasty("Ops, aconteceu algo.", "Erro ao buscar Sip Diagnostics.", "error", 10000);
            });
    }

    setSipDiagnostics() {
        if (this.sip) {

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