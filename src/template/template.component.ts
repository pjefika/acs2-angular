import { LogsComponent } from './../logs/logs.component';
import { DetalheComponent } from './../detalhe/detalhe.component';
import { BuscaComponent } from './../busca/busca.component';
import { HolderService } from './../utils/holder/holder.service';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    public componentData = null;

    constructor(
        private router: Router,
        private validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.validLoginService.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.router.navigate(['./entrar']);
                }
            });
        this.buscaEquipamento();
    }

    buscaEquipamento() {
        this.holderService.whoMenuIsActive = "busca-component";
        this.componentData = {
            component: BuscaComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createDetalhesEquipamento(eqp) {
        this.holderService.whoMenuIsActive = "detalhe-component";
        this.componentData = {
            component: DetalheComponent,
            inputs: {
                eqp: eqp
            }
        }
    }

    createLogsComponent() {
        this.holderService.whoMenuIsActive = "logs-component";
        this.componentData = {
            component: LogsComponent,
            inputs: {
                nothing: null
            }
        }
    }

    sair() {
        sessionStorage.clear();
        this.router.navigate(['entrar']);
    }

}