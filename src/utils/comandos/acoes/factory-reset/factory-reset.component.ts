import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoryResetService } from './factory-reset.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'factory-reset-component',
    templateUrl: 'factory-reset.component.html',
    styleUrls: ['factory-reset.component.css'],
    providers: [FactoryResetService, ToastyComponent]
})

export class FactoryResetComponent implements OnInit {

    private nomeBtn: string = "Sim";
    private disableBtn: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private factoryResetService: FactoryResetService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    factoryReset() {
        if (!this.disableBtn) {
            this.disableBtn = true;
            this.nomeBtn = "Aguarde";
            this.factoryResetService.factoryReset(this.holderService.equipamento)
                .then(data => {
                    if (data) {
                        this.callToasty("Sucesso", "Reset de fábrica realizado com sucesso, aguarde as configurações do modem.", "success", 0);
                        this.activeModal.close()
                        this.holderService.checkOnline = false;
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Reset de fábrica não realizado.", "error", 0);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
                });

        }
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}