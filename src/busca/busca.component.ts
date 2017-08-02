import { ListEqp } from './../template/mock/mocklisteqp';
import { BuscaService } from './busca.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'busca-component',
    templateUrl: 'busca.component.html',
    styleUrls: ['busca.component.css']
})

export class BuscaComponent implements OnInit {

    private listEqp = ListEqp;

    constructor(
        private buscaService: BuscaService) { }

    ngOnInit() {

    }

}