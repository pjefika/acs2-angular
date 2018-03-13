import { PortMapping } from './../../../../viewmodel/portMapping/portmapping';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortMappingService } from './port-mapping.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'port-mapping-component',
    templateUrl: 'port-mapping.component.html',
    styleUrls: ['port-mapping.component.css'],
    providers: [PortMappingService]
})

export class PortMappingComponent extends SuperComponentService implements OnInit {

    public portMaps: PortMapping[];
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private portMappingService: PortMappingService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getPortingMapping();
    }

    public getPortingMapping() {
        this.searching = true;
        this.portMappingService.getPortingMapping(this.variavelHolderService.equipamento)
            .then(data => {
                this.portMaps = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

}