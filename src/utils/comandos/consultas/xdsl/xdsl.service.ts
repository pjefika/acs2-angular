import { Xdsl } from './../../../../viewmodel/xdsl/xdsl';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class XdslService {

    constructor(
        private urlService: UrlService) { }

    public getXdslDiagnostic(device: Equipamento): Promise<Xdsl> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const url = `${this.urlService.url}` + "device/getXdslDiagnostic";
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.httpPostRequest(_data, "device/getXdslDiagnostic")
            .then(data => {
                return data as Xdsl
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}