import { ToastyComponent } from './../../../toasty/toasty.component';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { WifiService } from './wifi.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService]
})

export class WifiComponent extends SuperComponentService implements OnInit {

    public wifi: Wifi[];
    public searching: boolean = false;
    public btnSetWifi: boolean = false;
    public nomeBtn: string = "Modificar";

    constructor(
        public activeModal: NgbActiveModal,
        private wifiService: WifiService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getWifi();
    }

    public getWifi() {
        this.searching = true;
        this.btnSetWifi = true;
        this.wifiService.getWifi(this.variavelHolderService.equipamento)
            .then(data => {
                this.wifi = data;
                this.searching = false;
                this.btnSetWifi = false;
            }, error => {
                this.searching = false;
                this.btnSetWifi = false;
                this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setWifi() {
        if (this.wifi) {
            this.btnSetWifi = true;
            this.nomeBtn = "Aguarde";
            this.wifiService.setWifi(this.variavelHolderService.equipamento, this.wifi[0])
                .then(data => {
                    this.wifi[0] = data;
                    this.callToasty("Successo", "Alterações realizadas com sucesso.", "success", 10000);
                    this.nomeBtn = "Modificar";
                    this.btnSetWifi = false;
                }, error => {
                    this.nomeBtn = "Modificar";
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                    this.btnSetWifi = false;
                });
        }
    }
}