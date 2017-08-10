import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { ResetService } from './reset.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'reset-component',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css'],
    providers: [ResetService, ToastyComponent]
})

export class ResetComponent implements OnInit {

    private nomeBtn: string = "Sim";
    private disableBtn: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private resetService: ResetService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    resetar() {
        if (!this.disableBtn) {
            this.disableBtn = true;
            this.nomeBtn = "Aguarde";
            this.resetService.resetModem(this.holderService.equipamento)
                .then(data => {
                    if (data) {
                        this.callToasty("Sucesso", "Modem Reiniciado com sucesso, aguarde o mesmo sincronizar.", "success", 0);
                        this.activeModal.close()
                        this.holderService.checkOnline = false;
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "O modem não pode ser reiniciado.", "error", 0);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", "Sistema não conseguiu realizar ação no modem", "error", 0);
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