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

    constructor(
        public activeModal: NgbActiveModal,
        private wifiService: WifiService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.getWifi();
    }

    getWifi() {
        this.searching = true;
        this.wifiService.getWifi(this.holderService.equipamento)
            .then(data => {
                this.wifi = data;
                console.log(this.wifi)
                this.searching = false;
            }, error => {
                this.searching = false;
                console.log("Erro ao realizar consulta.");
            })

    }

    setWifi() {
        if (this.wifi) {
            console.log("Configurando Wifi Fake");
        }
    }
}