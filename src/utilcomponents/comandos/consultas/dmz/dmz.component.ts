// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DmzService } from './dmz.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dmz-component',
    templateUrl: 'dmz.component.html',
    styleUrls: ['dmz.component.css'],
    providers: [DmzService]
})

export class DmzComponent implements OnInit {
    
    constructor(
        // public activeModal: NgbActiveModal
    ) { }

    ngOnInit() { }
}