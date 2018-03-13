import { ToastyComponent } from './../../../toasty/toasty.component';
import { InterfaceStatic } from './../../../../viewmodel/interfacestatic/interfacestatic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterfaceStaticsService } from './interface-static.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'interface-statics-component',
    templateUrl: 'interface-statics.component.html',
    styleUrls: ['interface-statics.component.css'],
    providers: [InterfaceStaticsService]
})

export class InterfaceStaticsComponent extends SuperComponentService implements OnInit {

    public intStatic: InterfaceStatic[];
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private interfaceStaticsService: InterfaceStaticsService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getInterfaceStatistics();
    }

    public getInterfaceStatistics() {
        this.intStatic = null;
        this.searching = true;
        this.interfaceStaticsService.getInterfaceStatistics(this.variavelHolderService.equipamento)
            .then(data => {
                this.intStatic = data;
                this.searching = false;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                this.searching = false;
            });
    }

}