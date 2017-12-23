import { LanHost } from './../../../../viewmodel/lanhost/lanhost';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LanHostService {

    constructor(
        private urlService: UrlService) { }

    public getLanHosts(device: Equipamento): Promise<LanHost> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getLanHosts", _data)
            .then(data => {
                return data as LanHost
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}