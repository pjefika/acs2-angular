import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

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
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data.wifi as Wifi[]
            })
            .catch(super.handleError);
    }

    public setWifi(device: Equipamento, wifi: Wifi): Promise<Wifi> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, wifi: Wifi, executor: string };
        _data = { device: device, wifi: wifi, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setWifiInfo",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Wifi
            })
            .catch(super.handleError);
    }


    public setWifiLista(device: Equipamento, wifi: Wifi[]): Promise<Wifi> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, wifi: Wifi[], executor: string };
        _data = { device: device, wifi: wifi, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setWifiInfo",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Wifi
            })
            .catch(super.handleError);
    }

    public getWifiMock(): Promise<Wifi[]> {
        let w = require('../../../../assets/mock/wifi.json');
        let wifi: Wifi[] = w.wifi;
        return Promise.resolve(wifi);
    }

}