import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class BuscaService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getLista(criterio: string, input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: criterio, input: input, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "search/search",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Equipamento[]
            })
            .catch(super.handleError);
    }
}