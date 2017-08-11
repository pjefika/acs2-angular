import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthPPPoEService } from './auth-pppoe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'auth-pppoe-component',
    templateUrl: 'auth-pppoe.component.html',
    styleUrls: ['auth-pppoe.component.css'],
    providers: [AuthPPPoEService, ToastyComponent]
})

export class AuthPPPoEComponent implements OnInit {

    public pppoecred: PPPoECredentials;
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private authPPPoEService: AuthPPPoEService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getPPPoECredentials();
    }

    getPPPoECredentials() {
        this.searching = true;
        this.authPPPoEService.getPPPoECredentials(this.holderService.equipamento)
            .then(data => {
                this.pppoecred = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
            })
    }

    modificar() {
        if (this.pppoecred) {
            console.log("Modificando Fake");
        }
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

}