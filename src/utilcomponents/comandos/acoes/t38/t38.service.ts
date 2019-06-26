import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { Equipamento } from 'viewmodel/equipamento/equipamento';
import { UrlService } from 'util/urlservice/url.service';
import { T38 } from 'viewmodel/t38/t38';

@Injectable()
export class T38Service extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getT38Status(device: Equipamento): Promise<T38> {
        let _data: { guid: number };
        _data = { guid: device.deviceGUID }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getT38Enabled",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as T38
            })
            .catch(super.handleErrorKing);
    }

    public setT38Status(device: Equipamento, info: T38): Promise<any> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { guid: number, t38: T38, executor: string };
        _data = { guid: device.deviceGUID, t38: info, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/setT38Enabled",
            _data: _data,
            timeout: 300000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as any
            })
            .catch(super.handleErrorKing);
    }
}