import { UrlService } from './../../../url-service/url.service';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class FactoryResetService {

    constructor(
        private urlService: UrlService) { }

    public factoryReset(device: Equipamento): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/factoryReset", _data)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}