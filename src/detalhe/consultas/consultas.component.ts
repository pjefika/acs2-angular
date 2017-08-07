import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'consultas-component',
    templateUrl: 'consultas.component.html',
    styleUrls: ['consultas.component.css']
})

export class ConsultasComponent implements OnInit {

    btnActive: boolean = false;

    @Input() actived: boolean;

    constructor() { }

    ngOnInit() { }

    activeBtn() {
        this.btnActive = true;
    }

}