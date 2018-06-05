import { Usuario } from './../viewmodel/usuario/usuario';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'util/util.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { AlertService } from 'util/alert/alert.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService]
})

export class LoginComponent extends AlertService implements OnInit {

    private usuario = new Usuario();
    private logando: boolean = false;

    constructor(public utilService: UtilService,
        private loginService: LoginService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.utilService.isLogado().then((result: boolean) => {
            if (result) {
                this.utilService.navigate('./');
            }
        });
    }

    private doEntrar() {
        if (this.systemHolderService.ableMock) {
            this.entrarMock();
        } else {
            this.entrar();
        }
    }

    private entrar() {
        this.logando = true;
        this.loginService
            .autentica(this.usuario)
            .then(data => {
                if (data) {
                    this.loginService
                        .getUsuario(this.usuario)
                        .then(data => {
                            if (data.nivel > 0) {
                                this.usuario = data;
                                sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
                                this.utilService.navigate('./');
                            } else {
                                super.callAlert("warning", "Usuário não possui permissão para acessar este sistema.");
                                this.usuario.senha = "";
                            }
                        });
                } else {
                    //type: "warning", msg: "Usuário ou senha incorretos, por favor verifique."
                    super.callAlert("warning", "Usuário ou senha incorretos, por favor verifique.");
                    this.usuario.senha = "";
                }
                this.logando = false;
            }, error => {
                this.usuario.login = "";
                this.usuario.senha = "";
                super.callAlert("error", "Usuário ou senha incorretos, por favor verifique.");
                this.logando = false;
            });
    }

    private entrarMock() {
        this.logando = true;
        setTimeout(() => {
            this.usuario = this.loginService.getUsuarioMock();
            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
            this.utilService.navigate('./');
            this.logando = false;
        }, 1000);
    }
}