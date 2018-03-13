import { Dhcp } from './../../../../viewmodel/dhcp/dhcp';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class DhcpService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getDhcp(device: Equipamento): Promise<Dhcp> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getDhcp",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Dhcp
            })
            .catch(super.handleError);
    }

    public setDhcp(device: Equipamento, dhcp: Dhcp): Promise<Boolean> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, dhcp: Dhcp, executor: string };
        _data = { device: device, dhcp: dhcp, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setDhcp",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Dhcp
            })
            .catch(super.handleError);
    }
}