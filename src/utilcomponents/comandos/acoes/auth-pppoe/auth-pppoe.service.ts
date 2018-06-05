import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class AuthPPPoEService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getPPPoECredentials(device: Equipamento): Promise<PPPoECredentials> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getPPPoECredentials",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as PPPoECredentials
            })
            .catch(super.handleError);
    }

    public setPPPoECredentials(device: Equipamento, credentials: PPPoECredentials): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, credentials: PPPoECredentials, executor: string };
        _data = { device: device, credentials: credentials, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setPPPoECredentials",
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