import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'acoes-component',
    templateUrl: 'acoes.component.html'
})

export class AcoesComponent implements OnInit {

    btnActive: boolean = false;

    @Input() actived: boolean;
    
    constructor() { }

    ngOnInit() {

    }

    activeBtn() {
        this.btnActive = true;
    }

}