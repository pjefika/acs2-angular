import { Wan } from './../../../../viewmodel/wan/wan';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WanService {

    constructor(
        private urlService: UrlService) { }

    public getWanInfo(device: Equipamento): Promise<Wan> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.httpPostRequest(_data, "device/getWanInfo")
            .then(data => {
                return data as Wan
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}