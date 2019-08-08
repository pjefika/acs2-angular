import { Wan } from './../../../../viewmodel/wan/wan';
import { ToastyComponent } from './../../../toasty/toasty.component';
import { WanService } from './wan.service';
import { Component, OnInit } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';

@Component({
    selector: 'wan-component',
    templateUrl: 'wan.component.html',
    styleUrls: ['wan.component.css'],
    providers: [WanService]

})

export class WanComponent extends SuperComponentService implements OnInit {

    public wan: Wan;
    public searching: boolean = false;

    constructor(
        private wanService: WanService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getWanInfo();
    }

    public getWanInfo() {
        this.searching = true;
        this.systemHolderService.btnIsLoadingAction = true;
        this.wanService
            .getWanInfo(this.variavelHolderService.equipamento)
            .then(data => {
                this.wan = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.systemHolderService.btnIsLoadingAction = false;
            });
    }
}