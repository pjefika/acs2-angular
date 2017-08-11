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

    public setSipActivation() {

    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}