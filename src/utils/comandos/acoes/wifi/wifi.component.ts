import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { HolderService } from './../../../holder/holder.service';
import { WifiService } from './wifi.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService]
})

export class WifiComponent implements OnInit {

    private wifi: Wifi;
    private searching: boolean = false;
    private btnSetWifi: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private wifiService: WifiService,
        public holderService: HolderService) { }

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
                this.callAlert("Erro ao realizar consulta", "danger");
            });
    }

    setWifi() {
        if (this.wifi) {
            this.btnSetWifi = true;
            this.wifiService.setWifi(this.holderService.equipamento, this.wifi)
                .then(data => {
                    if (data) {
                        this.callAlert("Alterações realizadas com sucesso.", "success");
                        this.activeModal.close();
                    } else {
                        this.callAlert("Erro ao realizar alterações.", "danger");
                    }
                }, error => {
                    this.callAlert("Erro ao realizar alterações.", "danger");
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
}