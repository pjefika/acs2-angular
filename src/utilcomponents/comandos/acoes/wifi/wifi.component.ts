import { ToastyComponent } from './../../../toasty/toasty.component';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { WifiService } from './wifi.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { CanaisPossiveis } from 'viewmodel/wifi/canaispossiveis';
import * as _ from 'lodash';

declare var require: any;

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService]
})


export class WifiComponent extends SuperComponentService implements OnInit {

    setFromGet(wifis: Wifi[]) {
        const lw = wifis
        return lw;
    }

    private wifi: Wifi[];
    private searching: boolean = false;
    private btnSetWifi: boolean = false;
    private nomeBtn: string = "Modificar";
    private desabilitede: boolean = false;
    private ativandoWifi: boolean = false

    private redetypechoosed: number;
    private wifichoose: Wifi;
    private wifisToSet: Wifi[] = [new Wifi, new Wifi];
    private wifiToSet: Wifi = new Wifi;

    private canaispossiveis: CanaisPossiveis[];

    private showbtnwifi5g: boolean = false;

    private bloqbtnswitchrede: boolean = false;

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

    private clickchoosewifi(rtc: number) {
        switch (rtc) {
            case 2:
                this.wifichoose = this.wifi[0];
                this.wifiToSet = this.wifisToSet[0]
                break;
            case 5:
                if (this.variavelHolderService.equipamento.modelName == "RTF3505VW-N2" ||
                    (this.variavelHolderService.equipamento.modelName == "RTF3505VW-N1" &&
                        (
                            // this.variavelHolderService.equipamento.softwareVersion == "BR_SV_s00.00_g000_R3505VWN1001_s19" ||
                            this.variavelHolderService.equipamento.softwareVersion == "BR_SV_g000_R3505VWN1001_s26"))) {
                    this.wifichoose = this.wifi[4]
                } else {
                    this.wifichoose = this.wifi[this.wifi.length - 1];
                }
                this.wifiToSet = this.wifisToSet[1]
                break;
        }
        this.wifiToSet.index = this.wifichoose.index
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
                this.validbtnwifi5();
            }, error => {
                this.searching = false;
                this.btnSetWifi = false;
                if (error.mError == "Nenhuma interface WiFi se encontra habilitada.") {
                    this.desabilitede = true
                }
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.clickchoosewifi(2);
            });
    }

    addToSet(val, kindOf: Number) {
        switch (kindOf) {
            case 1:
                this.wifiToSet.operStatus = val
                break;
            case 2:
                this.wifiToSet.ssid = val
                break;
            case 3:
                this.wifiToSet.key = val
                break;
            case 4:
                this.wifiToSet.channel = val
                break;
            default:
                break;
        }
        console.log(this.wifiToSet)
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
                    this.desabilitede = false
                }, error => {
                    this.searching = false;
                    this.btnSetWifi = false;
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                })
                .then(() => {
                    this.clickchoosewifi(2);
                });
        }, 100);
    }

    public setWifiLista() {
        // let wl: Wifi[] = this.wifi;
        // switch (this.redetypechoosed) {
        //     case 2:
        //         wl[0] = this.wifichoose;
        //         break;
        //     case 5:
        //         wl[wl.length - 1] = this.wifichoose;
        //         break;
        // }

        // for (let i = 0; i < wl.length; i++) {
        //     delete wl[i].broadcastEnabled;
        // }
        this.bloqbtnswitchrede = true;
        this.showbtnwifi5g = false;
        this.btnSetWifi = true;
        this.nomeBtn = "Aguarde";
        if (!(this.wifiToSet.ssid == null && this.wifiToSet.key == null && this.wifiToSet.operStatus == null && this.wifiToSet.channel == null)) {

            this.wifiService
                .setWifiLista(this.variavelHolderService.equipamento, this.wifiToSet)
                .then(data => {
                    this.wifi = data;
                    this.clickchoosewifi(2);
                    this.callToasty("Successo", "Alterações realizadas com sucesso.", "success", 10000);
                    this.nomeBtn = "Modificar";
                    this.btnSetWifi = false;
                    this.desabilitede = false
                }, error => {
                    this.nomeBtn = "Modificar";
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                    this.btnSetWifi = false;
                    if (error.mError == "Nenhuma interface WiFi se encontra habilitada.") {
                        this.desabilitede = true
                    }
                }).then(() => {
                    this.bloqbtnswitchrede = false;
                    this.validbtnwifi5();
                    this.ativandoWifi = false
                })
        } else {
            this.callToasty("Não houve alteração.", "", "warning", 7000);
            this.nomeBtn = "Modificar";
            this.btnSetWifi = false;
            this.bloqbtnswitchrede = false;
            this.validbtnwifi5();
            this.ativandoWifi = false

        }

    }

    public ativaInterface() {
        this.ativandoWifi = true
        this.wifiToSet = {
            "operStatus": "Up",
            "index": "1"
        }
        this.setWifiLista()
    }

    public getCanaisPossiveis() {
        this.wifiService
            .getCanaisPossiveis()
            .then(resposta => {
                this.canaispossiveis = resposta;
            });
    }

    private validbtnwifi5() {
        if (this.wifi.length > 1) {
            this.showbtnwifi5g = true;
        } else {
            this.showbtnwifi5g = false;
        }
    }
}