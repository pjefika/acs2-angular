import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanHostService } from './lan-host.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lan-host-component',
    templateUrl: 'lan-host.component.html',
    styleUrls: ['lan-host.component.css'],
    providers: [LanHostService]
})

export class LanHostComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

}