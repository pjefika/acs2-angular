import { Dhcp } from './../../../../viewmodel/dhcp/dhcp';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class DhcpService {

    constructor(
        private urlService: UrlService) { }

    public getDhcp(device: Equipamento): Promise<Dhcp> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getDhcp", _data)
            .then(data => {
                return data as Dhcp
            })
            .catch(this.handleError);

    }

    public setDhcp(device: Equipamento, dhcp: Dhcp): Promise<Boolean> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, dhcp: Dhcp, executor: string };
        _data = { device: device, dhcp: dhcp, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/setDhcp", _data)
            .then(data => {
                return data as Dhcp
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}