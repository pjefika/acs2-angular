import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalheComponent } from 'detalhe/detalhe.component';
import { Router } from '@angular/router';

import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService } from 'login/login.service';
import { Usuario } from 'viewmodel/usuario/usuario';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { DynamicRouterService } from 'utilcomponents/dynamicrouter/dynamic-router.service';
import { UtilService } from 'util/util.service';
import { AlertService } from 'util/alert/alert.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'id-router-component',
    templateUrl: 'id-router.component.html',
    styleUrls: ['id-router.component.css'],
    providers: [LoginService]
})

export class IdRouterComponent extends AlertService implements OnInit, OnDestroy {

    private usuario = new Usuario;

    private sub: any;

    private alertOn: boolean = false;
    private alertInfo: {
        alertType: string,
        alertMsg: string
    }

    private showloginpage: boolean = false;

    private showmodalvalidvivoone: boolean = false;

    constructor(private route: ActivatedRoute,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public dynamicRouterService: DynamicRouterService,
        private loginService: LoginService,
        public util: UtilService,
        private router: Router,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.util.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.showloginpage = true;
                } else {
                    this.modalopen();
                }
            });
    }

    private continaBuscandoDevice() {
        this.sub = this.route.params.subscribe(params => {
            this.variavelHolderService.numerodeserie = params['id'];
        });
    }

    public ngOnDestroy() { }

    private doEntrar() {
        if (this.systemHolderService.ableMock) {
            this.entrarMock();
        } else {
            this.entrar();
        }
    }

    private entrar() {
        this.loginService
            .autentica(this.usuario)
            .then(data => {
                if (data) {
                    this.loginService
                        .getUsuario(this.usuario)
                        .then(data => {
                            this.usuario = data;
                            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
                            this.showloginpage = false;
                            this.modalopen();
                        });
                } else {
                    super.callAlert("warning", "Usuário ou senha incorretos, por favor verifique.");
                    this.usuario.senha = "";
                }
            }, error => {
                this.usuario.login = "";
                this.usuario.senha = "";
                super.callAlert("error", "Usuário ou senha incorretos, por favor verifique.");
            });
    }

    private entrarMock() {
        setTimeout(() => {
            this.usuario = this.loginService.getUsuarioMock();
            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
            this.showloginpage = false;
            this.modalopen();
        }, 1000);
    }

    private irParaIndex() {
        this.router.navigate(['./']);
    }

    private modalopen() {
        this.showmodalvalidvivoone = true;
    }

    private escolharede(typer: boolean) {
        this.systemHolderService.isvivoone = typer;
        this.continaBuscandoDevice();
    }

}