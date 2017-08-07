import { ResulTableEquipamentoComponent } from './result-table-equipamento/result-table-equipamento.component';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { ListEqp } from './../template/mock/mocklisteqp';
import { BuscaService } from './busca.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'busca-component',
    templateUrl: 'busca.component.html',
    styleUrls: ['busca.component.css'],
    providers: [BuscaService]
})

export class BuscaComponent implements OnInit {

    private listEqp: Equipamento[];

    private searchCond: {
        designador: string,
        serial: string,
        mac: string,
        ip: string
    }

    private searching: boolean = false;
    private searchWhat: string;

    constructor(
        private buscaService: BuscaService) {
        this.initConditions();
    }

    ngOnInit() {

    }

    buscar() {
        this.listEqp = null;
        this.searchWhat = "Buscando Equipamentos"
        this.searching = true;
        this.buscaService.getJson()
            .then(data => {
                this.listEqp = data;
                this.searching = false;
            }, error => {
                console.log(error);
            })
    }

    initConditions() {
        this.searchCond = {
            designador: "",
            serial: "",
            mac: "",
            ip: ""
        }
    }

}