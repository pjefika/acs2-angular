import { DetalheService } from './detalhe.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    providers: [DetalheService]
})

export class DetalheComponent implements OnInit {

    private id: number;

    constructor(
        private detalheService: DetalheService,
        private injector: Injector) {
        this.id = this.injector.get("id");
    }

    ngOnInit() {
        console.log(this.id);
    }
}