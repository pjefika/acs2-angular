import { HolderService } from './../../../holder/holder.service';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { ResetService } from './reset.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'reset-component',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css'],
    providers: [ResetService]
})

export class ResetComponent implements OnInit {

    private nomeBtn: string = "Sim";
    private disableBtn: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private resetService: ResetService,
        private holderService: HolderService) { }

    ngOnInit() { }

    resetar() {
        this.disableBtn = true;
        this.nomeBtn = "Aguarde";
        this.resetService.resetModem(this.holderService.equipamento)
            .then(data => {
                if (data) {
                    this.callAlert("Modem Reiniciado com sucesso, aguarde o mesmo sincronizar.", "success");
                    this.activeModal.close()
                } else {
                    this.callAlert("O modem não pode ser reiniciado.", "danger");
                }
            }, error => {
                this.callAlert("problema ao resetar modem.", "danger");
            });
    }

    callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

}