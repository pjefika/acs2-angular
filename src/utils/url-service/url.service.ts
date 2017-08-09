import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

    //private urlIp = "10.40.195.81"; // Produção
    private urlIp = "10.40.193.4"; // Produção 

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    public url = "http://" + this.urlIp + ":8080/acs/";

    constructor() { }

}