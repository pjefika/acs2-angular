import { Injectable } from '@angular/core';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';
import { Firmware } from 'viewmodel/equipamento/firmware';

@Injectable()
export class FirmareService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getInfoFirmware(guid: number): Promise<Firmware> {
        let _data: { guid: number };
        _data = { guid: guid }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/firmwareversion",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Firmware
            })
            .catch(super.handleErrorKing);
    }

    public setInfoFirmware(guid: number) {
        let _data: { guid: number };
        _data = { guid: guid }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/firmwareUpdate",
            _data: _data,
            timeout: 60000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Firmware
            })
            .catch(super.handleErrorKing);
    }
}