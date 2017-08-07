import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class BuscaService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private url = "http://10.40.195.81:8080/acs/";

    constructor(
        private http: Http) { }

    public getLista(criterio: string, input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.url}` + "search/search";
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: criterio, input: input, executor: usr.usr };
        //console.log(_data);
        return this.http.post(url, JSON.stringify(_data), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as Equipamento[]
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