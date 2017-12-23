import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HolderService } from 'utils/holder/holder.service';
import { DynamicRouterHolderService } from 'utils/dynamic-router/dynamic-router-holder.service';
import { DetalheComponent } from 'detalhe/detalhe.component';
import { Router } from '@angular/router';
import { ValidLoginService } from 'utils/login/valid-login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService } from 'login/login.service';
import { Usuario } from 'viewmodel/usuario/usuario';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
    selector: 'id-router-component',
    templateUrl: 'id-router.component.html',
    styleUrls: ['id-router.component.css'],
    providers: [DynamicRouterHolderService, LoginService]
})

export class IdRouterComponent implements OnInit, OnDestroy {

    private usuario = new Usuario;

    @ViewChild('modallogin') public modallogin: ElementRef;

    private sub: any;

    public modalRef: NgbModalRef;

    private alertOn: boolean = false;
    private alertInfo: {
        alertType: string,
        alertMsg: string
    }

    constructor(private route: ActivatedRoute,
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService,
        public validLoginService: ValidLoginService,
        private modalService: NgbModal,
        private loginService: LoginService,
        private router: Router) { }

    public ngOnInit() {
        this.validLoginService.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.open(this.modallogin);
                } else {
                    this.continaBuscandoDevice();
                }
            });
    }

    private open(content) {
        this.modalRef = this.modalService.open(content, { backdrop: 'static', keyboard: false });
    }

    private close(content) {
        this.modalRef.close();
    }

    private continaBuscandoDevice() {
        this.sub = this.route.params.subscribe(params => {
            this.holderService.deviceId = +params['id'];
        });
    }

    public ngOnDestroy() {
        //this.sub.unsubscribe();
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
                            localStorage.setItem('user', JSON.stringify({ usr: this.usuario.login, nivel: this.usuario.nivel }));
                            this.close(this.modallogin);
                            this.continaBuscandoDevice();
                        }, error => {
                            this.callAlert(error, 'danger');
                        })
                } else {
                    this.callAlert("Usuário ou senha incorretos, por favor verifique.", 'danger');
                }
            }, error => {
                this.usuario = new Usuario;
                this.callAlert(error, 'dander');
            })
    }

    private callAlert(msg: string, type: string) {
        this.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
        this.alertOn = true;
    }

    private irParaIndex() {
        this.router.navigate(['./']);
    }

}