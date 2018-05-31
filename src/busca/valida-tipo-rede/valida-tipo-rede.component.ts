import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { TemplateComponent } from 'template/template.component';

@Component({
    selector: 'valida-tipo-rede',
    templateUrl: 'valida-tipo-rede.component.html'
})

export class ValidaTipoRedeComponent extends SuperComponentService implements OnInit {

    constructor(public toastyComponent: ToastyComponent,
        public activeModal: NgbActiveModal,
        public systemHolderService: SystemHolderService,
        public templateComponent: TemplateComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { }

    private escolharede(typer: boolean) {
        this.systemHolderService.isvivoone = typer;
        this.templateComponent.createDetalhesEquipamento();
    }

}