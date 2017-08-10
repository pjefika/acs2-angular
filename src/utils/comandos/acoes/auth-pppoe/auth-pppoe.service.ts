import { UrlService } from './../../../url-service/url.service';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class AuthPPPoEService {

    constructor(
        private http: Http,
        private urlService: UrlService) { }

    getPPPoECredentials(device: Equipamento): Promise<PPPoECredentials> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.urlService.url}` + "device/getPPPoECredentials";
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.http.post(url, JSON.stringify(_data), this.urlService.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as PPPoECredentials
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}