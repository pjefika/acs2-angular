import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterfaceStaticsService } from './interface-static.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'interface-statics-component',
    templateUrl: 'interface-statics.component.html',
    styleUrls: ['interface-statics.component.css'],
    providers: [InterfaceStaticsService]
})

export class InterfaceStaticsComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }
}