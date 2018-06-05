import { Injectable } from '@angular/core';

@Injectable()
export class ExceptionService {

    constructor() { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public handleErrorKing(error: any): Promise<any> {
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