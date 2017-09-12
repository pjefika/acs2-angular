import { UrlService } from './../../../url-service/url.service';
import { InterfaceStatic } from './../../../../viewmodel/interfacestatic/interfacestatic';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InterfaceStaticsService {

    constructor(
        private urlService: UrlService) { }

    public getInterfaceStatistics(device: Equipamento): Promise<InterfaceStatic[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getInterfaceStatistics", _data)
            .then(data => {
                return data as InterfaceStatic[]
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}