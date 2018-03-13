import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Ping } from './../../../../viewmodel/ping/ping';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class PingService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public pingDiagnostic(device: Equipamento, host: string): Promise<Ping> {
        let request: { destAddress: string }
        request = { destAddress: host }
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, request, executor: string };
        _data = { device: device, request, executor: usr.usr }

        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/pingDiagnostic",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Ping
            })
            .catch(super.handleError);
    }

}