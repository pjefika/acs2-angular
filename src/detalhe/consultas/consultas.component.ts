import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'consultas-component',
    templateUrl: 'consultas.component.html',
    styleUrls: ['consultas.component.css']
})

export class ConsultasComponent implements OnInit {

    @Input() actived: boolean;
    disableBtn: boolean = false;
    @Input() isModem: boolean;

    constructor() { }

    ngOnInit() { 
        this.disable();
    }

    disable() {
        this.disableBtn = true;
    }

}