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

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    modificar() {
        console.log("Modificando Fake");
        
    }
}