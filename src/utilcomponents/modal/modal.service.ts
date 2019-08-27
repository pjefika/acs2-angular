
import { Injectable } from '@angular/core';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';
import { Equipamento } from 'viewmodel/equipamento/equipamento';

@Injectable()
export class ModalService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getDeviceActionQueue(device: Equipamento): Promise<any> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/getActionQueue",
            _data: _data,
            timeout: 30000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data
            })
            .catch(super.handleErrorKing);
    }


}