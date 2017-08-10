import { Dhcp } from './../../../../viewmodel/dhcp/dhcp';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class DhcpService {

    constructor(
        private http: Http,
        private urlService: UrlService) { }

    public getDhcp(device: Equipamento): Promise<Dhcp> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.urlService.url}` + "device/getDhcp";
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.http.post(url, JSON.stringify(_data), this.urlService.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as Dhcp
            })
            .catch(this.handleError);

    }

    public setDhcp(device: Equipamento, dhcp: Dhcp): Promise<Boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.urlService.url}` + "device/getDhcp";
        let _data: { device: Equipamento, dhcp: Dhcp, executor: string };
        _data = { device: device, dhcp: dhcp, executor: usr.usr }
        return this.http.post(url, JSON.stringify(_data), this.urlService.options)
            .timeout(12000)
            .toPromise()
            .then(response => {
                return response.json() as Boolean
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