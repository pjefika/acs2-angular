import { PortMapping } from './../../../../viewmodel/portMapping/portmapping';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class PortMappingService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getPortingMapping(device: Equipamento): Promise<PortMapping[]> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getPortMapping",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as PortMapping[]
            })
            .catch(super.handleError);
    }
}