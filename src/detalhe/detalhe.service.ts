import { UrlService } from './../utils/url-service/url.service';
import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class DetalheService {

    constructor(
        private urlService: UrlService) { }

    public getDetalhes(id: number): Promise<EquipamentoInfo> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { guid: number, executor: string };
        _data = { guid: id, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/detail", _data)
            .then(data => {
                return data as EquipamentoInfo
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}