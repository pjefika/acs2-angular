import { Xdsl } from './../../../../viewmodel/xdsl/xdsl';
import { ToastyComponent } from './../../../toasty/toasty.component';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { XdslService } from './xdsl.service';
import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'xdsl-component',
    templateUrl: 'xdsl.component.html',
    styleUrls: ['xdsl.component.css'],
    providers: [XdslService]
})

export class XdslComponent extends SuperComponentService implements OnInit {

    public xdsl: Xdsl;
    public searching: boolean = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private xdslService: XdslService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getXdslDiagnostic();
    }

    public getXdslDiagnostic() {
        this.searching = true;
        this.xdslService.getXdslDiagnostic(this.variavelHolderService.equipamento)
            .then(data => {
                this.xdsl = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
    }
}