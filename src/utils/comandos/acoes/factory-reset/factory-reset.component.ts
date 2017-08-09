import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoryResetService } from './factory-reset.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'factory-reset-component',
    templateUrl: 'factory-reset.component.html',
    styleUrls: ['factory-reset.component.css'],
    providers: [FactoryResetService]
})

export class FactoryResetComponent implements OnInit {

    private nomeBtn: string = "Sim";
    private disableBtn: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private factoryResetService: FactoryResetService,
        public holderService: HolderService) { }

    ngOnInit() { }

    factoryReset() {
        if (!this.disableBtn) {
            this.disableBtn = true;
            this.nomeBtn = "Aguarde";
            this.factoryResetService.factoryReset(this.holderService.equipamento)
                .then(data => {
                    if (data) {
                        this.callAlert("Reset de fábrica realizado com sucesso, aguarde as configurações do modem.", "success");
                        this.activeModal.close()
                        this.holderService.checkOnline = false;
                    } else {
                        this.callAlert("Reset de fábrica não realizado.", "danger");
                    }
                }, error => {
                    this.callAlert("problema ao realizar reset de fábrica no modem.", "danger");
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

}