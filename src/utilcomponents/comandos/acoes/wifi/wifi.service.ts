import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';
import { CanaisPossiveis } from 'viewmodel/wifi/canaispossiveis';

declare var require: any

@Injectable()
export class WifiService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getWifi(device: Equipamento): Promise<Wifi[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getWifiInfo",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data.wifi as Wifi[]
            })
            .catch(super.handleErrorKing);
    }

    public setWifi(device: Equipamento, wifi: Wifi): Promise<Wifi[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, wifi: Wifi, executor: string };
        _data = { device: device, wifi: wifi, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setWifiInfo",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data.wifi as Wifi[]
            })
            .catch(super.handleErrorKing);
    }

    public setWifiLista(device: Equipamento, setwifi: Wifi) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, wifi: { wifi: Wifi[] }, executor: string };
        _data = { device: device, wifi: { wifi: [setwifi] }, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setWifiInfo",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data.wifi as Wifi[]
            })
            .catch(super.handleErrorKing);
    }

    public getWifiMock(): Promise<Wifi[]> {
        let w = require('../../../../assets/mock/wifi.json');
        let wifi: Wifi[] = w.wifi;
        return Promise.resolve(wifi);
    }

    public getCanaisPossiveis(): Promise<CanaisPossiveis[]> {
        let canaisPossiveis: CanaisPossiveis[] = require('../../../../assets/mock/wifichannel.json');
        return Promise.resolve(canaisPossiveis);
    }

}