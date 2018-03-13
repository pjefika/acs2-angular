import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class DetalheService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getDetalhes(id: number): Promise<EquipamentoInfo> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { guid: number, executor: string };
        _data = { guid: id, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/detail",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as EquipamentoInfo
            })
            .catch(super.handleError);
    }
}