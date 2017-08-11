import { Xdsl } from './../../../../viewmodel/xdsl/xdsl';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { XdslService } from './xdsl.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'xdsl-component',
    templateUrl: 'xdsl.component.html',
    styleUrls: ['xdsl.component.css'],
    providers: [XdslService, ToastyComponent]
})

export class XdslComponent implements OnInit {

    private xdsl: Xdsl;
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private xdslService: XdslService) { }

    ngOnInit() {
        this.getXdslDiagnostic();
    }

    getXdslDiagnostic() {
        this.searching = true;
        this.xdslService.getXdslDiagnostic(this.holderService.equipamento)
            .then(data => {
                this.xdsl = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
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