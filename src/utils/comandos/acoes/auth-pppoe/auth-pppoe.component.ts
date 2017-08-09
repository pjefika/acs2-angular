import { HolderService } from './../../../holder/holder.service';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthPPPoEService } from './auth-pppoe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'auth-pppoe-component',
    templateUrl: 'auth-pppoe.component.html',
    styleUrls: ['auth-pppoe.component.css'],
    providers: [AuthPPPoEService]
})

export class AuthPPPoEComponent implements OnInit {

    private pppoecred: PPPoECredentials;
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private authPPPoEService: AuthPPPoEService,
        public holderService: HolderService) { }

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
                console.log("Erro ao realizar busca");
            })
    }

    modificar() {
        if (this.pppoecred) {
            console.log("Modificando Fake");
        }
    }

}