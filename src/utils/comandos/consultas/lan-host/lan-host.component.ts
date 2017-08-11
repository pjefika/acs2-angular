import { LanHost } from './../../../../viewmodel/lanhost/lanhost';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanHostService } from './lan-host.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lan-host-component',
    templateUrl: 'lan-host.component.html',
    styleUrls: ['lan-host.component.css'],
    providers: [LanHostService, ToastyComponent]
})

export class LanHostComponent implements OnInit {

    private lanHost: LanHost;
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private lanHostService: LanHostService) { }

    ngOnInit() {
        this.getLanHosts();
    }

    getLanHosts() {
        this.searching = true;
        this.lanHostService.getLanHosts(this.holderService.equipamento)
            .then(data => {
                this.lanHost = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
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