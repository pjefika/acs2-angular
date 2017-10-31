import { UrlService } from './../../../url-service/url.service';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class AuthPPPoEService {

    constructor(
        private urlService: UrlService) { }

    public getPPPoECredentials(device: Equipamento): Promise<PPPoECredentials> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getPPPoECredentials", _data)
            .then(data => {
                return data as PPPoECredentials
            })
            .catch(this.handleError);
    }

    public setPPPoECredentials(device: Equipamento, credentials: PPPoECredentials): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, credentials: PPPoECredentials, executor: string };
        _data = { device: device, credentials: credentials, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/setPPPoECredentials", _data)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}