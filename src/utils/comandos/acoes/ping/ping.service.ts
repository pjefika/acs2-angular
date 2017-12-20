import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Ping } from './../../../../viewmodel/ping/ping';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class PingService {

    constructor(
        private urlService: UrlService) { }

    public pingDiagnostic(device: Equipamento, host: string): Promise<Ping> {
        let request: { destAddress: string }
        request = { destAddress: host }
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, request, executor: string };
        _data = { device: device, request, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/pingDiagnostic", _data)
            .then(data => {
                return data as Ping
            })
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}