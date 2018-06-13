import { ToastyComponent } from './../../../toasty/toasty.component';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { AuthPPPoEService } from './auth-pppoe.service';
import { Component, OnInit } from '@angular/core';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'auth-pppoe-component',
    templateUrl: 'auth-pppoe.component.html',
    styleUrls: ['auth-pppoe.component.css'],
    providers: [AuthPPPoEService]
})

export class AuthPPPoEComponent extends SuperComponentService implements OnInit {

    public pppoecred: PPPoECredentials;
    public searching: boolean = false;
    public btnName: string = "Modificar";
    public btnDisabled: boolean = false;

    constructor(
        private authPPPoEService: AuthPPPoEService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    ngOnInit() {
        this.getPPPoECredentials();
    }

    public getPPPoECredentials() {
        this.searching = true;
        this.authPPPoEService.getPPPoECredentials(this.variavelHolderService.equipamento)
            .then(data => {
                this.pppoecred = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
    }

    public setPPPoECredentials() {
        if (this.pppoecred && !this.btnDisabled) {
            this.btnName = "Aguarde";
            this.btnDisabled = true;
            this.authPPPoEService
                .setPPPoECredentials(this.variavelHolderService.equipamento, this.pppoecred)
                .then(data => {
                    this.btnName = "Modificar";
                    this.btnDisabled = false;
                    if (data) {
                        this.callToasty("Sucesso.", "Modificado com sucesso.", "success", 10000);
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Comando voltou negativo, não modificado.", "error", 10000);
                    }
                }, error => {
                    this.btnName = "Modificar";
                    this.btnDisabled = false;
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                });
        }
    }

}