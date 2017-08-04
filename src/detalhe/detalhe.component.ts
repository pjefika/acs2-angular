import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { DetalheService } from './detalhe.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'detalhe-component',
    templateUrl: 'detalhe.component.html',
    styleUrls: ['detalhe.component.css'],
    providers: [DetalheService]
})

export class DetalheComponent implements OnInit {

    private eqpReady: boolean = false;
    private searching: boolean = false;
    private searchWhat: string;

    private id: number;

    private eqp: Equipamento;

    constructor(
        private detalheService: DetalheService,
        private injector: Injector) {
        this.eqp = this.injector.get("eqp");
    }

    ngOnInit() {
        //console.log(this.eqp);
        this.buscaEqpInd();
    }

    buscaEqpInd() {
        this.searching = true;
        this.searchWhat = "Carregando Equipamento";

        setTimeout(() => {
            this.eqpReady = true;
            this.searching = false;
        }, 1000);
    }
}