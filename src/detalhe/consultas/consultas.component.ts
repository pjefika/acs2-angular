import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'consultas-component',
    templateUrl: 'consultas.component.html',
    styleUrls: ['consultas.component.css']
})

export class ConsultasComponent implements OnInit {

    btnActive: boolean = false;

    constructor() { }

    ngOnInit() { }

    activeBtn() {
        this.btnActive = true;
    }

}