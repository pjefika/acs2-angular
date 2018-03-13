import { LanHost } from './../../../../viewmodel/lanhost/lanhost';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class LanHostService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getLanHosts(device: Equipamento): Promise<LanHost> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getLanHosts",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as LanHost
            })
            .catch(super.handleError);
    }
}