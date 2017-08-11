import { HolderService } from './../../../holder/holder.service';
import { Wan } from './../../../../viewmodel/wan/wan';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WanService } from './wan.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wan-component',
    templateUrl: 'wan.component.html',
    styleUrls: ['wan.component.css'],
    providers: [WanService, ToastyComponent]

})

export class WanComponent implements OnInit {

    public wan: Wan;
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private wanService: WanService) { }

    ngOnInit() {
        this.getWanInfo();
    }

    getWanInfo() {
        this.searching = true;
        this.wanService.getWanInfo(this.holderService.equipamento)
            .then(data => {
                this.wan = data;
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