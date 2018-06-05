import { ServiceClass } from './../../../../viewmodel/serviceclass/serviceclass';
import { ToastyComponent } from './../../../toasty/toasty.component';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceClassService } from './service-class.service';
import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'service-class-component',
    templateUrl: 'service-class.component.html',
    styleUrls: ['service-class.component.css'],
    providers: [ServiceClassService]
})

export class ServiceClassComponent extends SuperComponentService implements OnInit {

    public serviceClass: ServiceClass;
    public searching: boolean = false;
    public btnServiceClass: boolean = false;
    public nomeBtn: string = "Modificar";

    constructor(
        // public activeModal: NgbActiveModal,
        private serviceClassService: ServiceClassService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getServiceClass();
    }

    public getServiceClass() {
        this.searching = true;
        this.btnServiceClass = true;
        this.serviceClassService.getServiceClass(this.variavelHolderService.equipamento)
            .then(data => {
                this.serviceClass = data;
                this.searching = false;
                this.btnServiceClass = false;
            }, error => {
                this.searching = false;
                this.btnServiceClass = false;
                // this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setServiceClass() {
        if (this.serviceClass) {
            this.btnServiceClass = true;
            this.nomeBtn = "Aguarde";
            this.serviceClassService.setServiceClass(this.variavelHolderService.equipamento, this.serviceClass)
                .then(data => {
                    this.nomeBtn = "Modificar";
                    if (data) {
                        this.callToasty("Sucesso.", "Service Class modificado com sucesso.", "success", 10000);
                    }
                    this.btnServiceClass = false;
                }, error => {
                    this.nomeBtn = "Modificar";
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                    this.btnServiceClass = false;
                });
        }
    }
}