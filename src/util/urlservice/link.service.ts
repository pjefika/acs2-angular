import { Injectable } from '@angular/core';
import { ExceptionService } from '../exceptionservice/exception.service';
import { InfoRequest } from 'viewmodel/inforequest/inforequest';
import { UrlEndPoint } from 'viewmodel/inforequest/urlendpoint';

declare var require: any

@Injectable()
export class LinkService extends ExceptionService {

    private islinkprod: boolean = false; // valida link produção.

    constructor() {
        super();
    }

    public mountInfoLinkRequestProd(): InfoRequest {
        let infoRequest: InfoRequest;
        infoRequest = {
            rqst: "get",
            command: "getlinks",
            path: "getlinks/",
            otherUrl: ""
        }
        return infoRequest;
    }

    public mountInfoLinkRequestQA(): InfoRequest {
        let infoRequest: InfoRequest;
        infoRequest = {
            rqst: "get",
            command: "getlinks",
            path: "getlinks/",
            otherUrl: ""
        }
        return infoRequest;
    }

    public getLinksMock(): UrlEndPoint {
        let urls: UrlEndPoint;
        if (this.islinkprod) {
            urls = require('../../assets/mock/links/link_prod.json'); //Mock Produção
        } else {
            // urls = require('../../assets/mock/links/link_qa.json'); //Mock QA
            urls = require('../../assets/mock/links/link_ext.json'); //Mock EXT
        }
        return urls;
    }
}