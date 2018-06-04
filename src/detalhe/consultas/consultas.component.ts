import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

import { InterfaceStaticsComponent } from 'utilcomponents/comandos/consultas/interface-statics/interface-statics.component';
import { WanComponent } from 'utilcomponents/comandos/consultas/wan/wan.component';
import { LanHostComponent } from 'utilcomponents/comandos/consultas/lan-host/lan-host.component';
import { XdslComponent } from 'utilcomponents/comandos/consultas/xdsl/xdsl.component';
import { PortMappingComponent } from 'utilcomponents/comandos/consultas/port-mapping/port-mapping.component';
import { SipGetComponent } from 'utilcomponents/comandos/consultas/sip/sip.component';
import { DmzComponent } from 'utilcomponents/comandos/consultas/dmz/dmz.component';
import { HistoriaComponent } from 'utilcomponents/comandos/consultas/historia/historia.component';

@Component({
    selector: 'consultas-component',
    templateUrl: 'consultas.component.html',
    styleUrls: ['consultas.component.css']
})

export class ConsultasComponent implements OnInit, OnChanges {

    public openmodalsearchandactions: boolean = false;

    @Input() isModem: boolean;

    private component: any;
    private title: string;

    constructor(public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
    }

    private domount(c: string, title: string) {
        this.title = title;
        this.whatComponentSearch(c);
    }

    private domountcomp(c: any) {
        this.component = {
            component: c,
            inputs: {
                nothing: null
            }
        }
    }

    public whatComponentSearch(what: string) {
        switch (what) {
            case "wan-component":
                this.domountcomp(WanComponent);
                break;
            case "interface-statics-component":
                this.domountcomp(InterfaceStaticsComponent);
                break;
            case "lan-host-component":
                this.domountcomp(LanHostComponent);
                break;
            case "xdsl-component":
                this.domountcomp(XdslComponent);
                break;
            case "port-mapping-component":
                this.domountcomp(PortMappingComponent);
                break;
            case "sip-get-component":
                this.domountcomp(SipGetComponent);
                break;
            case "dmz-component":
                this.domountcomp(DmzComponent);
                break;
            case "historia-component":
                this.domountcomp(HistoriaComponent);
                break;
        }
        this.openmodalsearchandactions = true;
    }

}