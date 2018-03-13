import { ServiceClass } from './../../../../viewmodel/serviceclass/serviceclass';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class ServiceClassService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getServiceClass(device: Equipamento): Promise<ServiceClass> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getServiceClass",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as ServiceClass
            })
            .catch(super.handleError);
    }

    public setServiceClass(device: Equipamento, service: ServiceClass): Promise<Boolean> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, service: ServiceClass, executor: string };
        _data = { device: device, service: service, executor: usr.usr }

        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setServiceClass",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Boolean
            })
            .catch(super.handleError);
    }

}