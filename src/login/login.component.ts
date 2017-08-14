import { Usuario } from './../viewmodel/usuario/usuario';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService]
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
        private validLoginService: ValidLoginService) { }

    ngOnInit() {
        this.validLoginService
            .isLogado()
            .then((result: boolean) => {
                if (result) {
                    this.router.navigate(['./']);
                }
            })
    }

    entrar() {
        this.loginService
            .autentica(this.usuario)
            .then(data => {
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
                }
            }, error => {
                this.usuario = new Usuario;
                this.callAlert(error, 'dander');
            })
    }

    callAlert(msg: string, type: string) {
        this.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
        this.alertOn = true;
    }
}