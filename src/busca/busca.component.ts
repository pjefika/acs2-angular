import { HolderService } from './../utils/holder/holder.service';
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

    private whatIsSearchingInput: string;
    private whatIsSearching: string;

    private searching: boolean = false;
    private searchWhat: string;

    private showTableResult: boolean = false;

    constructor(
        private buscaService: BuscaService,
        private holderService: HolderService) {
        this.initConditions();
    }

    ngOnInit() {
        this.resetHolder();
    }

    buscar() {
        this.whatIsSearching = null;
        this.whatIsSearchingInput = null;

        this.seeWhatIsSearching();

        this.listEqp = null;
        this.searchWhat = "Buscando Equipamentos"
        this.searching = true;
        this.showTableResult = false;
        this.buscaService.getLista(this.whatIsSearching, this.whatIsSearchingInput)
            .then(data => {
                this.listEqp = data;
                this.searching = false;
                this.holderService.alertOn = false;
                this.showTableResult = true;
                if (data.length === 0) {
                    this.callAlert("A busca não obteve resultados.", "danger");
                }
            }, error => {
                this.searching = false;
                this.callAlert("Por favor verifique os dados inseridos.", "danger");
            })
    }

    seeWhatIsSearching() {
        if (this.searchCond.designador) {
            this.whatIsSearching = "SUBSCRIBER";
            this.whatIsSearchingInput = this.searchCond.designador;
        } else if (this.searchCond.ip) {
            this.whatIsSearching = "IP";
            this.whatIsSearchingInput = this.searchCond.ip;
        } else if (this.searchCond.mac) {
            this.whatIsSearching = "MAC";
            this.whatIsSearchingInput = this.searchCond.mac;
        } else if (this.searchCond.serial) {
            this.whatIsSearching = "SERIAL";
            this.whatIsSearchingInput = this.searchCond.serial;
        }
    }

    initConditions() {
        this.searchCond = {
            designador: "",
            serial: "",
            mac: "",
            ip: ""
        }
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    resetHolder() {
        this.holderService.alertInfo = {
            alertMsg: "",
            alertType: ""
        }
        this.holderService.alertOn = false;
        this.holderService.checkOnline = false;
        this.holderService.whoMenuIsActive = "";
        this.holderService.equipamento = new Equipamento;
    }

}