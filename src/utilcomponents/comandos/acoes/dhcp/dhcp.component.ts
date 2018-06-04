import { ToastyComponent } from './../../../toasty/toasty.component';
import { Dhcp } from './../../../../viewmodel/dhcp/dhcp';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DhcpService } from './dhcp.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'dhcp-component',
    templateUrl: 'dhcp.component.html',
    styleUrls: ['dhcp.component.css'],
    providers: [DhcpService]
})

export class DhcpComponent extends SuperComponentService implements OnInit {

    public searching: boolean = false;
    public dhcp: Dhcp;
    public btnSetDhcp: boolean = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private dhcpService: DhcpService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    ngOnInit() {
        this.getDhcp();
    }

    public getDhcp() {
        this.searching = true;
        this.btnSetDhcp = true;
        this.dhcpService.getDhcp(this.variavelHolderService.equipamento)
            .then(data => {
                this.dhcp = data;
                this.searching = false;
                this.btnSetDhcp = false;
            }, error => {
                this.btnSetDhcp = false;
                // this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setDhcp() {
        if (this.dhcp) {
            this.btnSetDhcp = true;
            this.dhcpService.setDhcp(this.variavelHolderService.equipamento, this.dhcp)
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
}