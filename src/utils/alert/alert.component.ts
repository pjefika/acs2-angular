import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {

    @Input() alertOn: boolean = false;

    @Input() alertInfo: {
        alertType: string,
        alertMsg: string
    }

    constructor() { }

    ngOnInit() { }
}