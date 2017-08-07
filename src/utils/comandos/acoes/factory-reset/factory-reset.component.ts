import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoryResetService } from './factory-reset.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'factory-reset-component',
    templateUrl: 'factory-reset.component.html',
    styleUrls: ['factory-reset.component.css'],
    providers: [FactoryResetService]
})

export class FactoryResetComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    factoryReset() {
        console.log("Facotry Reset Fake");

    }

}