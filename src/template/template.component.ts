import { LogsComponent } from './../logs/logs.component';
import { DetalheComponent } from './../detalhe/detalhe.component';
import { BuscaComponent } from './../busca/busca.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { UtilService } from 'util/util.service';
import { DynamicRouterService } from 'utilcomponents/dynamicrouter/dynamic-router.service';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    constructor(public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public util: UtilService,
        public dynamicRouterService: DynamicRouterService) { }

    public ngOnInit() {
        this.util.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.util.navigate('./entrar');
                }
            });
        this.buscaEquipamento();
    }

    public buscaEquipamento() {
        this.systemHolderService.whoMenuIsActive = "busca-component";
        this.clearHolders();
        this.setToDynamicComponent(BuscaComponent);
    }

    public createDetalhesEquipamento() {
        this.systemHolderService.whoMenuIsActive = "detalhe-component";
        this.setToDynamicComponent(DetalheComponent);
    }

    public createLogsComponent() {
        this.systemHolderService.whoMenuIsActive = "logs-component";
        this.setToDynamicComponent(LogsComponent);
    }

    public setToDynamicComponent(component: any) {
        this.dynamicRouterService.component = null;
        setTimeout(() => {
            this.dynamicRouterService.component = component;
        }, 1);
    }

    public sair() {
        sessionStorage.clear();
        this.util.navigate('./entrar');
    }

    private clearHolders() {
        this.variavelHolderService.checkOnline = false;
        this.variavelHolderService.equipamento = null;
        // this.variavelHolderService.lstEquipamentos = null;
        this.variavelHolderService.numerodeserie = null;
    }

}