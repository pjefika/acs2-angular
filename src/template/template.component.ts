import { LogsComponent } from './../logs/logs.component';
import { DetalheComponent } from './../detalhe/detalhe.component';
import { BuscaComponent } from './../busca/busca.component';
import { HolderService } from './../utils/holder/holder.service';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DynamicRouterHolderService } from 'utils/dynamic-router/dynamic-router-holder.service';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [DynamicRouterHolderService]
})

export class TemplateComponent implements OnInit {

    constructor(
        private router: Router,
        public validLoginService: ValidLoginService,
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    public ngOnInit() {
        this.validLoginService.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.router.navigate(['./entrar']);
                }
            });
        this.buscaEquipamento();
    }

    public buscaEquipamento() {
        this.holderService.whoMenuIsActive = "busca-component";
        this.dynamicRouterHolderService.component = BuscaComponent;
    }

    public createDetalhesEquipamento() {
        this.holderService.whoMenuIsActive = "detalhe-component";
        this.dynamicRouterHolderService.component = DetalheComponent;
    }

    public createLogsComponent() {
        this.holderService.whoMenuIsActive = "logs-component";
        this.dynamicRouterHolderService.component = LogsComponent;
    }

    sair() {
        sessionStorage.clear();
        this.router.navigate(['entrar']);
    }

}