import { Wan } from './../../../../viewmodel/wan/wan';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class WanService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getWanInfo(device: Equipamento): Promise<Wan> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getWanInfo",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Wan
            })
            .catch(super.handleErrorKing);
    }
}