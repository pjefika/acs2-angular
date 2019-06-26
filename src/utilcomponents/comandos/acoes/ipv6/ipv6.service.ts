import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';
import { Equipamento } from 'viewmodel/equipamento/equipamento';
import { IPV6 } from 'viewmodel/ipv6/ipv6';

@Injectable()
export class Ipv6Service extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getIPV6Status(device: Equipamento): Promise<IPV6> {
        let _data: { guid: number };
        _data = { guid: device.deviceGUID }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getLanIPv6",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as IPV6
            })
            .catch(super.handleErrorKing);
    }

    public setIPV6Status(device: Equipamento, v6: IPV6): Promise<any> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { guid: number, lanIPv6Auto: IPV6, executor: string };
        _data = { guid: device.deviceGUID, lanIPv6Auto: v6, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setLanIPv6",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as any
            })
            .catch(super.handleErrorKing);
    }
}