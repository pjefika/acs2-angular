import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WanService } from './wan.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wan-component',
    templateUrl: 'wan.component.html',
    styleUrls: ['wan.component.css'],
    providers: [WanService]

})

export class WanComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }
}