import { ToastyComponent } from './../../../toasty/toasty.component';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { HolderService } from './../../../holder/holder.service';
import { WifiService } from './wifi.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService, ToastyComponent]
})

export class WifiComponent implements OnInit {

    private wifi: Wifi;
    private searching: boolean = false;
    private btnSetWifi: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private wifiService: WifiService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getWifi();
    }

    getWifi() {
        this.searching = true;
        this.btnSetWifi = true;
        this.wifiService.getWifi(this.holderService.equipamento)
            .then(data => {
                this.wifi = data;
                console.log(this.wifi)
                this.searching = false;
                this.btnSetWifi = false;
            }, error => {
                this.searching = false;
                this.btnSetWifi = false;
                this.callToasty("Ops, aconteceu algo.", "Erro ao realizar consulta.", "error", 0);
            });
    }

    setWifi() {
        if (this.wifi) {
            this.btnSetWifi = true;
            this.wifiService.setWifi(this.holderService.equipamento, this.wifi)
                .then(data => {
                    if (data) {
                        this.callToasty("Successo", "Alterações realizadas com sucesso.", "success", 0);
                        this.activeModal.close();
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Erro ao realizar alterações.", "error", 0);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", "Sistema não conseguiu realizar alterações.", "error", 0);
                });
        }
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
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