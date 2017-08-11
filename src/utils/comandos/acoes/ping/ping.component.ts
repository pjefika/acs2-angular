import { ToastyComponent } from './../../../toasty/toasty.component';
import { Ping } from './../../../../viewmodel/ping/ping';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PingService } from './ping.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ping-component',
    templateUrl: 'ping.component.html',
    styleUrls: ['ping.component.css'],
    providers: [PingService, ToastyComponent]
})

export class PingComponent implements OnInit {

    public host: string = "www.google.com";
    public ping: Ping;
    public btnPing: boolean = false;
    public nomeBtn: string = "Pingar";

    constructor(
        public activeModal: NgbActiveModal,
        private pingService: PingService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    pingDiagnostic() {
        this.btnPing = true;
        this.nomeBtn = "Aguarde";
        this.pingService.pingDiagnostic(this.holderService.equipamento, this.host)
            .then(data => {
                this.ping = data;
                this.btnPing = false;
                this.nomeBtn = "Pingar";
                this.callToasty("Sucesso", "Ping realizado com sucesso.", "success", 5000);                
            }, error => {
                this.btnPing = false;
                this.nomeBtn = "Pingar";
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
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