import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { XdslService } from './xdsl.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'xdsl-component',
    templateUrl: 'xdsl.component.html',
    styleUrls: ['xdsl.component.css'],
    providers: [XdslService]
})

export class XdslComponent implements OnInit {
    
    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }
}