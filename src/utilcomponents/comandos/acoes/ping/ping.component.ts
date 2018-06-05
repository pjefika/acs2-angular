import { ToastyComponent } from './../../../toasty/toasty.component';
import { Ping } from './../../../../viewmodel/ping/ping';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PingService } from './ping.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'ping-component',
    templateUrl: 'ping.component.html',
    styleUrls: ['ping.component.css'],
    providers: [PingService]
})

export class PingComponent extends SuperComponentService implements OnInit {

    public host: string = "www.google.com";
    public ping: Ping;
    public btnPing: boolean = false;
    public nomeBtn: string = "Pingar";

    constructor(
        // public activeModal: NgbActiveModal,
        private pingService: PingService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    ngOnInit() { }

    public pingDiagnostic() {
        this.btnPing = true;
        this.nomeBtn = "Aguarde";
        this.pingService.pingDiagnostic(this.variavelHolderService.equipamento, this.host)
            .then(data => {
                this.ping = data;
                this.btnPing = false;
                this.nomeBtn = "Pingar";
                super.callToasty("Sucesso", "Ping realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnPing = false;
                this.nomeBtn = "Pingar";
                super.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }
}