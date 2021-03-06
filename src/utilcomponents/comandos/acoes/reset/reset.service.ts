import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ResetService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public resetModem(device: Equipamento): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/reboot",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Boolean
            })
            .catch(super.handleError);
    }
}