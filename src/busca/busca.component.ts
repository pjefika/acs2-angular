import { ResulTableEquipamentoComponent } from './result-table-equipamento/result-table-equipamento.component';
import { Equipamento } from './../viewmodel/equipamento/equipamento';
import { ListEqp } from './../template/mock/mocklisteqp';
import { BuscaService } from './busca.service';
import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'busca-component',
    templateUrl: 'busca.component.html',
    styleUrls: ['busca.component.css'],
    providers: [BuscaService]
})

export class BuscaComponent extends SuperComponentService implements OnInit {

    public listEqp: Equipamento[];

    public searchCond: {
        designador: string,
        serial: string,
        mac: string,
        ip: string
    }

    public whatIsSearchingInput: string;
    public whatIsSearching: string;

    public searching: boolean = false;
    public searchWhat: string;

    public showTableResult: boolean = false;

    public nomeBtn: string = "Buscar";

    constructor(
        private buscaService: BuscaService,
        public toastyComponent: ToastyComponent,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.initConditions();
        if (this.variavelHolderService.lstEquipamentos) {
            this.showTableResult = true;
        }
        this.resetHolder();
    }

    private doBuscar() {
        if (this.systemHolderService.ableMock) {
            this.buscarMock();
        } else {
            this.buscar();
        }
    }

    private buscarMock() {
        // if (this.validEmptySearch()) {
        if (!this.searching) {
            this.nomeBtn = "Aguarde";
            this.whatIsSearching = null;
            this.whatIsSearchingInput = null;
            this.seeWhatIsSearching();
            this.listEqp = null;
            this.searchWhat = "Buscando Equipamentos"
            this.searching = true;
            this.showTableResult = false;
            setTimeout(() => {
                this.listEqp = this.buscaService.getListaMock();
                this.searching = false;
                this.showTableResult = true;
                this.searching = false;
                this.nomeBtn = "Buscar";
            }, 1000);
        }
        // } else {
        //     this.callToasty("Informativo", "Por favor preencha um dos campos de busca.", "warning", 5000);
        // }
    }

    public buscar() {

        if (!this.searching) {
            this.nomeBtn = "Aguarde";
            this.whatIsSearching = null;
            this.whatIsSearchingInput = null;
            this.seeWhatIsSearching();
            if (this.validEmptySearch()) {
                this.listEqp = null;
                this.searchWhat = "Buscando Equipamentos"
                this.searching = true;
                this.showTableResult = false;
                this.buscaService.getLista(this.whatIsSearching, this.whatIsSearchingInput)
                    .then(data => {
                        this.listEqp = data;
                        this.searching = false;
                        this.showTableResult = true;
                        if (data.length === 0) {
                            this.callToasty("Ops, aconteceu algo.", "A busca não obteve resultados.", "error", 15000);
                        }
                    }, error => {
                        this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
                    })
                    .then(() => {
                        this.searching = false;
                        this.nomeBtn = "Buscar";
                    });
            } else {
                this.callToasty("Informativo", "Por favor preencha um dos campos de busca.", "warning", 5000);
            }
        }
    }

    public seeWhatIsSearching() {
        if (this.searchCond.designador) {
            this.whatIsSearching = "SUBSCRIBER";
            this.whatIsSearchingInput = this.searchCond.designador.trim();
        } else if (this.searchCond.ip) {
            this.whatIsSearching = "IP";
            this.whatIsSearchingInput = this.searchCond.ip.trim();
        } else if (this.searchCond.mac) {
            this.whatIsSearching = "MAC";
            this.whatIsSearchingInput = this.searchCond.mac.trim();
        } else if (this.searchCond.serial) {
            this.whatIsSearching = "SERIAL";
            this.whatIsSearchingInput = this.searchCond.serial.trim();
        }
    }

    private validEmptySearch(): boolean {        
        let valid: boolean = true;
        if (this.whatIsSearching === undefined || this.whatIsSearchingInput === undefined || this.whatIsSearching === null || this.whatIsSearchingInput === null) {
            valid = false;
        }
        return valid;
    }

    public initConditions() {
        this.searchCond = {
            designador: "",
            serial: "",
            mac: "",
            ip: ""
        }
    }

    public resetHolder() {
        this.variavelHolderService.checkOnline = false;
        this.systemHolderService.whoMenuIsActive = "";
        this.variavelHolderService.equipamento = new Equipamento;
    }

}