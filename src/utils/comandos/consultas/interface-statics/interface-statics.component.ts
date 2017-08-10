import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { InterfaceStatic } from './../../../../viewmodel/interfacestatic/interfacestatic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterfaceStaticsService } from './interface-static.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'interface-statics-component',
    templateUrl: 'interface-statics.component.html',
    styleUrls: ['interface-statics.component.css'],
    providers: [InterfaceStaticsService, ToastyComponent]
})

export class InterfaceStaticsComponent implements OnInit {

    private intStatic: InterfaceStatic;
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private interfaceStaticsService: InterfaceStaticsService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getInterfaceStatistics();
    }

    getInterfaceStatistics() {
        this.searching = true;
        this.interfaceStaticsService.getInterfaceStatistics(this.holderService.equipamento)
            .then(data => {
                this.intStatic = data;
                this.searching = false;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", "Erro ao buscar interface static.", "error", 10000);
                this.searching = false;
            });
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