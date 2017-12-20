import { ToastyComponent } from './../utils/toasty/toasty.component';
import { Usuario } from './../viewmodel/usuario/usuario';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService, ToastyComponent]
})

export class LoginComponent implements OnInit {

    usuario = new Usuario;

    alertOn: boolean = false;
    alertInfo: {
        alertType: string,
        alertMsg: string
    }

    constructor(
        private loginService: LoginService,
        private router: Router,
        private validLoginService: ValidLoginService,
        public toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.validLoginService
            .isLogado()
            .then((result: boolean) => {
                if (result) {
                    this.router.navigate(['./']);
                }
            })
    }

    private entrar() {
        this.loginService
            .autentica(this.usuario)
            .then(data => {
                //console.log(data);
                if (data) {
                    this.loginService
                        .getUsuario(this.usuario)
                        .then(data => {
                            this.usuario = data;
                            sessionStorage.setItem('user', JSON.stringify({ usr: this.usuario.login, nivel: this.usuario.nivel }));
                            this.router.navigate(['./']);
                        }, error => {
                            this.callAlert(error, 'dander');
                        })
                } else {
                    this.callAlert("Usuário ou senha incorretos, por favor verifique.", 'danger');
                    //this.callToasty("Ops, aconteceu algo.", "Usuário ou senha incorretos, por favor verifique.", "danger", 0);
                }
            }, error => {
                this.usuario = new Usuario;
                this.callAlert(error, 'dander');
            })
    }

    callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    callAlert(msg: string, type: string) {
        this.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
        this.alertOn = true;
    }
}