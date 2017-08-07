import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PingService } from './ping.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ping-component',
    templateUrl: 'ping.component.html',
    styleUrls: ['ping.component.css'],
    providers: [PingService]
})

export class PingComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    pingar() {
        console.log("Efetuando Ping Fake")
    }
}