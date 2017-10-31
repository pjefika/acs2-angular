import { PortMapping } from './../../../../viewmodel/portMapping/portmapping';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PortMappingService {

    constructor(
        private urlService: UrlService) { }

    getPortingMapping(device: Equipamento): Promise<PortMapping[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getPortMapping", _data)
            .then(data => {
                return data as PortMapping[]
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}