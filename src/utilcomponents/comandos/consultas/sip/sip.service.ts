import { SipIn } from './../../../../viewmodel/sip/sipin';
import { Sip } from './../../../../viewmodel/sip/sip';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class SipService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getSipDiagnostics(device: Equipamento, phyref: string): Promise<Sip> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, phyref: string, executor: string };
        _data = { device: device, phyref: phyref, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getSipDiagnostics",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Sip
            })
            .catch(super.handleError);
    }

    public setSipActivation(device: Equipamento, sipIn: SipIn) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, sip: SipIn, executor: string };
        _data = { device: device, sip: sipIn, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setSipActivation",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Sip
            })
            .catch(super.handleError);
    }

}