import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResetService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private url = "http://10.40.195.81:8080/acs/";

    constructor(
        private http: Http) { }

    public resetModem(device: Equipamento): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.url}` + "device/reboot";

        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }

        return this.http.post(url, JSON.stringify(_data), this.options)
            .timeout(12000)
            .toPromise()
            .then(response => {
                return response.json() as Boolean;
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