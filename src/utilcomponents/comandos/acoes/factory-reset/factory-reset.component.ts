import { ToastyComponent } from './../../../toasty/toasty.component';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoryResetService } from './factory-reset.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'factory-reset-component',
    templateUrl: 'factory-reset.component.html',
    styleUrls: ['factory-reset.component.css'],
    providers: [FactoryResetService]
})

export class FactoryResetComponent extends SuperComponentService implements OnInit {

    public nomeBtn: string = "Sim";
    public disableBtn: boolean = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private factoryResetService: FactoryResetService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    ngOnInit() { }

    public factoryReset() {
        if (!this.disableBtn) {
            this.systemHolderService.btnIsLoadingAction = true;
            this.disableBtn = true;
            this.nomeBtn = "Aguarde";
            this.factoryResetService.factoryReset(this.variavelHolderService.equipamento)
                .then(data => {
                    if (data) {
                        this.callToasty("Sucesso", "Reset de fábrica realizado com sucesso, aguarde as configurações do modem.", "success", 0);
                        // this.activeModal.close()
                        this.variavelHolderService.checkOnline = false;
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Reset de fábrica não realizado.", "error", 0);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
                })
                .then(() => {
                    this.systemHolderService.btnIsLoadingAction = false;
                })

        }
    }

}