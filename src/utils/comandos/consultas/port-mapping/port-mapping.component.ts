import { PortMapping } from './../../../../viewmodel/portMapping/portmapping';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortMappingService } from './port-mapping.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'port-mapping-component',
    templateUrl: 'port-mapping.component.html',
    styleUrls: ['port-mapping.component.css'],
    providers: [PortMappingService, ToastyComponent]
})

export class PortMappingComponent implements OnInit {

    public portMaps: PortMapping[];
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private portMappingService: PortMappingService) { }

    ngOnInit() {
        this.getPortingMapping();
    }

    public getPortingMapping() {
        this.searching = true;
        this.portMappingService.getPortingMapping(this.holderService.equipamento)
            .then(data => {
                this.portMaps = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}