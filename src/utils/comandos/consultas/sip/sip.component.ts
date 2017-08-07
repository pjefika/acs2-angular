import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sip-consulta-component',
    templateUrl: 'sip.component.html'
})

export class SipConsultaComponent implements OnInit {
    
    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }
}