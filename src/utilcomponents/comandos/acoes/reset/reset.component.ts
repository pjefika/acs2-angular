import { ToastyComponent } from './../../../toasty/toasty.component';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { ResetService } from './reset.service';
import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'reset-component',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css'],
    providers: [ResetService]
})

export class ResetComponent extends SuperComponentService implements OnInit {

    public nomeBtn: string = "Sim";
    public disableBtn: boolean = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private resetService: ResetService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { }

    public resetar() {
        if (!this.disableBtn) {
            this.disableBtn = true;
            this.nomeBtn = "Aguarde";
            this.resetService.resetModem(this.variavelHolderService.equipamento)
                .then(data => {
                    if (data) {
                        this.callToasty("Sucesso", "Modem Reiniciado com sucesso, aguarde o mesmo sincronizar.", "success", 0);
                        // this.activeModal.close()
                        this.variavelHolderService.checkOnline = false;
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "O modem não pode ser reiniciado.", "error", 0);
                    }
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
                });
        }
    }

}