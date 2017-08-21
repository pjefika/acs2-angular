import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnChanges {

    @Input() alertOn: boolean = false;

    @Input() public alertInfo: {
        alertType: string;
        alertMsg: string;
    }
    
    constructor(
        public holderService: HolderService) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

    }
}