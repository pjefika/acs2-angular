import { UrlService } from './../utils/url-service/url.service';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class BuscaService {

    constructor(
        private urlService: UrlService) { }

    public getLista(criterio: string, input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: criterio, input: input, executor: usr.usr };
        return this.urlService.request("post", this.urlService.pathAcs + "search/search", _data)
            .then(data => {
                return data as Equipamento[]
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}