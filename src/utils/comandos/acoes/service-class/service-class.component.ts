import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceClassService } from './service-class.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'service-class-component',
    templateUrl: 'service-class.component.html',
    styleUrls: ['service-class.component.css'],
    providers: [ServiceClassService]
})

export class ServiceClassComponent implements OnInit {
    
    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    configurar() {
        console.log("Service Class Fake");
        
    }
}