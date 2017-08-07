import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'reset-component',
    templateUrl: 'reset.component.html'
})

export class ResetComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    resetar() {
        console.log("Resetando Fake");
    }

}