import { UrlService } from './../../../url-service/url.service';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class WifiService {

    constructor(
        private urlService: UrlService) { }

    public getWifi(device: Equipamento): Promise<Wifi> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getWifiInfo", _data)
            .then(data => {
                return data as Wifi
            })
            .catch(this.handleError);
    }

    public setWifi(device: Equipamento, wifi: Wifi): Promise<Wifi> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, wifi: Wifi, executor: string };
        _data = { device: device, wifi: wifi, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/setWifiInfo", _data)
            .then(data => {
                return data as Wifi
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}