import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'acoes-component',
    templateUrl: 'acoes.component.html'
})

export class AcoesComponent implements OnInit {

    btnActive: boolean = false;
    
    constructor() { }

    ngOnInit() {

    }

    activeBtn() {
        this.btnActive = true;
    }

}