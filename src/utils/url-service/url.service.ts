import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

    private urlIp = "10.200.35.66"; // Produção / 10.200.35.67
    //private urlIp = "localhost"; // Dev 

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    public url = "http://" + this.urlIp + ":8080/acs/";

    constructor(private http: Http) { }

    public httpPostRequest(_data: any, command: string) {
        const url = `${this.url}` + command;
        return this.http.post(url, JSON.stringify(_data), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}