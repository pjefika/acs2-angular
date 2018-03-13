import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'consultas-component',
    templateUrl: 'consultas.component.html',
    styleUrls: ['consultas.component.css']
})

export class ConsultasComponent implements OnInit {

    @Input() isModem: boolean;

    constructor() { }

    public ngOnInit() { }

}