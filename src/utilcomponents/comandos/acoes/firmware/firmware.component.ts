import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { FirmareService } from './firmware.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { Firmware } from 'viewmodel/equipamento/firmware';

@Component({
    selector: 'firmware-component',
    templateUrl: 'firmware.component.html',
    providers: [FirmareService]
})

export class FirmwareComponent extends SuperComponentService implements OnInit {

    private firmware: Firmware;

    public btndisableupdatefirmware: boolean = true;

    public btnnameupdatefirmware: string;

    constructor(public toastyComponent: ToastyComponent,
        private firmareService: FirmareService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getInfoFirmware();
    }

    private getInfoFirmware() {
        this.btnnameupdatefirmware = "Validando Firmware";
        this.firmareService
            .getInfoFirmware(this.variavelHolderService.equipamento.deviceGUID)
            .then(resposta => {
                this.firmware = resposta;
                if (this.firmware && this.firmware.updated) {
                    this.btndisableupdatefirmware = true;
                    this.btnnameupdatefirmware = "Firmware Atualizado";
                } else {
                    this.btndisableupdatefirmware = false;
                    this.btnnameupdatefirmware = "Atualizar Firmware";
                }
            }, error => {
                this.callToasty("Ops, aconteceu algo", error.mError, "error", 10000);
            })
            // .then(() => {

            // })
    }

    public setInfoFirmware() {
        this.btnnameupdatefirmware = "Atualizando Firmware";
        this.btndisableupdatefirmware = true;
        this.firmareService
            .setInfoFirmware(this.variavelHolderService.equipamento.deviceGUID)
            .then(resposta => {
                this.firmware = resposta;
            }, error => {
                this.callToasty("Ops, aconteceu algo", error.mError, "error", 10000);
                this.callToasty("Ops, aconteceu algo", "Por favor atualize as informações do equipamento.", "warning", 10000);
            })
            .then(() => {
                if (this.firmware.updated) {
                    this.btndisableupdatefirmware = true;
                    this.btnnameupdatefirmware = "Firmware Atualizado";
                } else {
                    this.btndisableupdatefirmware = false;
                    this.btnnameupdatefirmware = "Atualizar Firmware";
                }
            });
    }


}