import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'acoes-component',
    templateUrl: 'acoes.component.html'
})

export class AcoesComponent implements OnInit {

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