import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthPPPoEService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private url = "http://10.40.195.81:8080/acs/";

    constructor(
        private http: Http) { }

    getPPPoECredentials(device: Equipamento): Promise<PPPoECredentials> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.url}` + "device/getPPPoECredentials";
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.http.post(url, JSON.stringify(_data), this.options)
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