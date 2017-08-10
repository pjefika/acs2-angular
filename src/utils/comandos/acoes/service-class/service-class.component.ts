import { ServiceClass } from './../../../../viewmodel/serviceclass/serviceclass';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceClassService } from './service-class.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'service-class-component',
    templateUrl: 'service-class.component.html',
    styleUrls: ['service-class.component.css'],
    providers: [ServiceClassService, ToastyComponent]
})

export class ServiceClassComponent implements OnInit {

    private serviceClass: ServiceClass;
    private searching: boolean = false;
    private btnServiceClass: boolean = false;
    private nomeBtn: string = "Modificar";

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private serviceClassService: ServiceClassService) { }

    ngOnInit() {
        this.getServiceClass();
    }

    getServiceClass() {
        this.searching = true;
        this.btnServiceClass = true;
        this.serviceClassService.getServiceClass(this.holderService.equipamento)
            .then(data => {
                this.serviceClass = data;
                this.searching = false;
                this.btnServiceClass = false;
            }, error => {
                this.searching = false;
                this.btnServiceClass = false;
                this.callToasty("Ops, aconteceu algo.", "Erro ao buscar Service Class.", "error", 10000);
            });
    }

    setServiceClass() {
        if (this.btnServiceClass) {
            this.nomeBtn = "Aguarde";
            this.searching = true;
            this.searching = false;
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