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

    constructor(public util: UtilService,
        private loginService: LoginService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.util.navigate('./');
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
        this.loginService
            .autentica(this.usuario)
            .then(data => {
                if (data) {
                    this.loginService
                        .getUsuario(this.usuario)
                        .then(data => {
                            this.usuario = data;
                            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
                            this.util.navigate('./');
                        });
                } else {
                    //type: "warning", msg: "Usuário ou senha incorretos, por favor verifique."
                    super.callAlert("warning", "Usuário ou senha incorretos, por favor verifique.");
                    this.callToasty("Informativo.", "Usuário ou senha incorretos, por favor verifique.", "warning", 8000);
                    this.usuario.senha = "";
                }
            }, error => {
                this.usuario.login = "";
                this.usuario.senha = "";
                this.callToasty("Informativo.", "Usuário ou senha incorretos, por favor verifique.", "warning", 8000);
                super.callAlert("error", "Usuário ou senha incorretos, por favor verifique.");
            });
    }

    private entrarMock() {
        setTimeout(() => {
            this.usuario = this.loginService.getUsuarioMock();
            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
            this.util.navigate('./');
        }, 1000);
    }
}