import { EquipamentoInfo } from './../viewmodel/equipamento/device';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';
import { CheckIp } from 'viewmodel/equipamento/checkip/checkip';
import { Autenticacao } from 'viewmodel/equipamento/auth/autenticacao';
import { Equipamento } from 'viewmodel/equipamento/equipamento';

declare var require: any

@Injectable()
export class DetalheService extends SuperService {

    constructor(
        private urlService: UrlService) {
        super();
    }

    public getDetalhes(id: number): Promise<EquipamentoInfo> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { guid: number, executor: string };
        _data = { guid: id, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/detail",
            _data: _data,
            timeout: 180000 // 3m
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as EquipamentoInfo
            })
            .catch(super.handleError);
    }

    public validIpIsEqual(mac: string): Promise<Autenticacao> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { macOrIp: string, executor: string };
        _data = { macOrIp: mac, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "stealerAPI",
            path: "oss/auth/",
            _data: _data,
            timeout: 180000 // 3m
        }
        return this.urlService.request(this.infoResquest)
            .then(resposta => {
                return resposta as Autenticacao
            })
            .catch(super.handleErrorKing);
    }

    public validIpIsEqualMock(mac: string): Promise<Autenticacao> {
        let autenticacao: Autenticacao = require('../assets/mock/auth.json');
        return Promise.resolve(autenticacao);
    }

    public checkOnlineIssue(eqp: Equipamento): Promise<boolean> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: eqp, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: "acs",
            path: "device/forceOnlineDevice",
            _data: _data,
            timeout: 180000 // 3m
        }
        return this.urlService.request(this.infoResquest)
            .then(resposta => {
                return resposta as Boolean
            })
            .catch(super.handleErrorKing);
    }

    public checkOnlineIssueMock(id: number): Promise<boolean> {
        console.log("entrou check online mock");
        return Promise.resolve(true);
    }

}