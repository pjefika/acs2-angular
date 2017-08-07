import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortMappingService } from './port-mapping.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'port-mapping-component',
    templateUrl: 'port-mapping.component.html',
    styleUrls: ['port-mapping.component.css'],
    providers: [PortMappingService]
})

export class PortMappingComponent implements OnInit {
    
    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }
}