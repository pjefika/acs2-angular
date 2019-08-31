
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';
import { QueuePicture } from 'viewmodel/acsResponse/queue-picture';
import { Equipamento } from 'viewmodel/equipamento/equipamento';
import { AcsResponse } from 'viewmodel/acsResponse/acsresponse';

@Injectable()
export class DeviceQueueService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getDeviceActionQueue(device: Equipamento): Promise<QueuePicture> {
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
                let d: AcsResponse = data
                return d.queuePictures[(d.queuePictures.length - 1)]
            })
            .catch(super.handleErrorKing);
    }

    public clearDeviceActionQueue(device: Equipamento): Promise<QueuePicture> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/clearActionQueue",
            _data: _data,
            timeout: 30000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                let d: AcsResponse = data
                return d.queuePictures[(d.queuePictures.length - 1)]
            })
            .catch(super.handleErrorKing);
    }

}