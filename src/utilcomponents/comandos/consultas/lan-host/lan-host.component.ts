import { LanHost } from './../../../../viewmodel/lanhost/lanhost';
import { ToastyComponent } from './../../../toasty/toasty.component';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanHostService } from './lan-host.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'lan-host-component',
    templateUrl: 'lan-host.component.html',
    styleUrls: ['lan-host.component.css'],
    providers: [LanHostService]
})

export class LanHostComponent extends SuperComponentService implements OnInit {

    public lanHost: LanHost;
    public searching: boolean = false;

    constructor(
        // public activeModal: NgbActiveModal,
        private lanHostService: LanHostService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getLanHosts();
    }

    public getLanHosts() {
        this.searching = true;
        this.lanHostService.getLanHosts(this.variavelHolderService.equipamento)
            .then(data => {
                this.lanHost = data;                
            }, error => {
                // this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.searching = false;
            });
    }


}