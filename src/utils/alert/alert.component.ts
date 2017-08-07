import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {

    constructor(
        public holderService: HolderService) { }

    ngOnInit() {
    }
}