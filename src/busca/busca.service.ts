import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

declare var require: any

@Injectable()
export class BuscaService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getLista(criterio: string, input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { criterio: string, search: string, executor: string };
        _data = { criterio: criterio, search: input, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "search/search",
            _data: _data,
            timeout: 80000 // 1m:20s
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Equipamento[]
            })
            .catch(super.handleErrorKing);
    }

    public getListaMock(): Equipamento[] {
        let eqp: Equipamento[] = require('../assets/mock/listeqp.json');
        return eqp;
    }
}