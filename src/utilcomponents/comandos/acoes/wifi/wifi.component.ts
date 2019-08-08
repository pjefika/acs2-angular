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

    public wifi: Wifi[];
    public searching: boolean = false;
    public btnSetWifi: boolean = false;
    public nomeBtn: string = "Modificar";
    public desabilitede: boolean = false;
    public ativandoWifi: boolean = false

    public redetypechoosed: number;
    public wifichoose: Wifi;
    public wifisToSet: Wifi[] = [new Wifi, new Wifi];
    public wifiToSet: Wifi = new Wifi;

    public canaispossiveis: CanaisPossiveis[];

    public showbtnwifi5g: boolean = false;

    public bloqbtnswitchrede: boolean = false;

    public loadingMensagem: string = "Buscando Wifi - Não encerre esta janela para não gerar falha no dispositivo. Esta ação pode demorar até 5 minutos dependendo do dispositivo";

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

    public clickchoosewifi(rtc: number) {
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
                            this.variavelHolderService.equipamento.softwareVersion == "BR_SV_g000_R3505VWN1001_s26")) ||
                    this.wifi.length > 5) {
                    this.wifichoose = this.wifi[4]
                } else if (this.variavelHolderService.equipamento.modelName == "SagemcomFast5340TFN") {
                    this.wifichoose = this.wifi[1]
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

    public getWifi() {
        this.searching = true;
        this.btnSetWifi = true;
        this.systemHolderService.btnIsLoadingAction = true;
        this.wifiService
            .getWifi(this.variavelHolderService.equipamento)
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
                this.systemHolderService.btnIsLoadingAction = false;
                this.clickchoosewifi(2);
            });
    }

    public addToSet(val, kindOf: Number) {
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

    public getWifiMock() {
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
        this.systemHolderService.btnIsLoadingAction = true;
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
                    this.systemHolderService.btnIsLoadingAction = false;
                })
        } else {
            this.callToasty("Não houve alteração.", "", "warning", 7000);
            this.nomeBtn = "Modificar";
            this.btnSetWifi = false;
            this.bloqbtnswitchrede = false;
            this.validbtnwifi5();
            this.ativandoWifi = false;
            this.systemHolderService.btnIsLoadingAction = false;

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

    public validbtnwifi5() {
        if (this.wifi.length > 1) {
            this.showbtnwifi5g = true;
        } else {
            this.showbtnwifi5g = false;
        }
    }
}