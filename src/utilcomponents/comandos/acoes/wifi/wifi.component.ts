import { ToastyComponent } from './../../../toasty/toasty.component';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { WifiService } from './wifi.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { CanaisPossiveis } from 'viewmodel/wifi/canaispossiveis';

declare var require: any;

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService]
})

export class WifiComponent extends SuperComponentService implements OnInit {

    private wifi: Wifi[];
    private searching: boolean = false;
    private btnSetWifi: boolean = false;
    private nomeBtn: string = "Modificar";

    private redetypechoosed: number;
    private wifichoose: Wifi;

    private canaispossiveis: CanaisPossiveis[];

    constructor(
        private wifiService: WifiService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.dogetwifi();
        this.getCanaisPossiveis();
    }

    private clickchoosewifi(w: Wifi, rtc: number) {
        this.wifichoose = w;
        this.redetypechoosed = rtc;
    }

    public dogetwifi() {
        if (this.systemHolderService.ableMock) {
            this.getWifiMock();
        } else {
            this.getWifi();
        }
    }

    private getWifi() {
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
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.clickchoosewifi(this.wifi[0], 2);
            });
    }

    private getWifiMock() {
        this.searching = true;
        this.btnSetWifi = true;
        setTimeout(() => {
            this.wifiService.getWifiMock()
                .then(data => {
                    this.wifi = data;
                    this.searching = false;
                    this.btnSetWifi = false;
                }, error => {
                    this.searching = false;
                    this.btnSetWifi = false;
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                })
                .then(() => {
                    this.clickchoosewifi(this.wifi[0], 2);
                });
        }, 100);
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

    public setWifiLista() {
        if (this.wifichoose) {
            let wl: Wifi[] = [this.wifichoose];
            this.btnSetWifi = true;
            this.nomeBtn = "Aguarde";
            this.wifiService.setWifiLista(this.variavelHolderService.equipamento, wl)
                .then(data => {
                    // this.wifi[0] = data;
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

    public getCanaisPossiveis() {
        this.wifiService
            .getCanaisPossiveis()
            .then(resposta => {
                this.canaispossiveis = resposta;
            });
    }
}