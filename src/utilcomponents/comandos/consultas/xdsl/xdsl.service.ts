import { Xdsl } from './../../../../viewmodel/xdsl/xdsl';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class XdslService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getXdslDiagnostic(device: Equipamento): Promise<Xdsl> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getXdslDiagnostic",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Xdsl
            })
            .catch(super.handleError);
    }
}