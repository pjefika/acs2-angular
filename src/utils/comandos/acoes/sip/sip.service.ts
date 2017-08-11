import { SipIn } from './../../../../viewmodel/sip/sipin';
import { Sip } from './../../../../viewmodel/sip/sip';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class SipService {

    constructor(
        private urlService: UrlService) { }

    public getSipDiagnostics(device: Equipamento, phyref: number): Promise<Sip> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, phyref: number, executor: string };
        _data = { device: device, phyref: phyref, executor: usr.usr }
        return this.urlService.httpPostRequest(_data, "device/getSipDiagnostics")
            .then(data => {
                return data as Sip
            })
            .catch(this.handleError);
    }

    public setSipActivation(device: Equipamento, sipIn: SipIn): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, sip: SipIn, executor: string };
        _data = { device: device, sip: sipIn, executor: usr.usr }
        return this.urlService.httpPostRequest(_data, "device/setSipActivation")
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}