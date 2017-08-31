import { ToastyComponent } from './../../../toasty/toasty.component';
import { Dhcp } from './../../../../viewmodel/dhcp/dhcp';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DhcpService } from './dhcp.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dhcp-component',
    templateUrl: 'dhcp.component.html',
    styleUrls: ['dhcp.component.css'],
    providers: [DhcpService, ToastyComponent]
})

export class DhcpComponent implements OnInit {

    public searching: boolean = false;
    public dhcp: Dhcp;
    public btnSetDhcp: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private dhcpService: DhcpService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getDhcp();
    }

    public getDhcp() {
        this.searching = true;
        this.btnSetDhcp = true;
        this.dhcpService.getDhcp(this.holderService.equipamento)
            .then(data => {
                this.dhcp = data;
                this.searching = false;
                this.btnSetDhcp = false;
            }, error => {
                this.btnSetDhcp = false;
                this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setDhcp() {
        if (this.dhcp) {
            this.btnSetDhcp = true;
            this.dhcpService.setDhcp(this.holderService.equipamento, this.dhcp)
                .then(data => {
                    if (data) {
                        this.callToasty("Sucesso", "Informações de DHCP alteradas com sucesso.", "success", 10000);
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Erro ao realizar alteração das informações.", "error", 10000);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                });
        }
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