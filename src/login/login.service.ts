import { Usuario } from './../viewmodel/usuario/usuario';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/urlservice/url.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(private urlService: UrlService) { super(); }

    public autentica(usuario: Usuario): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: "authAPI",
            path: "autentica/verificarCredencial",
            _data: usuario,
            timeout: 60000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Boolean
            })
            .catch(super.handleError);
    }

    public getUsuario(usuario: Usuario): Promise<Usuario> {

        this.infoResquest = {
            rqst: "get",
            command: "authAPI",
            path: "autentica/consultar/",
            _data: usuario.login,
            timeout: 60000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Usuario
            })
            .catch(super.handleError);
    }

    public getUsuarioMock(): Usuario {
        return JSON.parse('{"login":"G0034481","nivel":10}');
    }

}