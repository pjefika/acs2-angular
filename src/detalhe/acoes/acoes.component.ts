import { Component, OnInit, Input } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { ResetComponent } from 'utilcomponents/comandos/acoes/reset/reset.component';
import { FactoryResetComponent } from 'utilcomponents/comandos/acoes/factory-reset/factory-reset.component';
import { PingComponent } from 'utilcomponents/comandos/acoes/ping/ping.component';
import { WifiComponent } from 'utilcomponents/comandos/acoes/wifi/wifi.component';
import { AuthPPPoEComponent } from 'utilcomponents/comandos/acoes/auth-pppoe/auth-pppoe.component';
import { SipSetComponent } from 'utilcomponents/comandos/acoes/sip/sip.component';
import { ServiceClassComponent } from 'utilcomponents/comandos/acoes/service-class/service-class.component';
import { DhcpComponent } from 'utilcomponents/comandos/acoes/dhcp/dhcp.component';
import { Ipv6Component } from 'utilcomponents/comandos/acoes/ipv6/ipv6.component';
import { T38Component } from 'utilcomponents/comandos/acoes/t38/t38.component';

@Component({
    selector: 'acoes-component',
    templateUrl: 'acoes.component.html',
    styleUrls: ['acoes.component.css']
})

export class AcoesComponent implements OnInit {

    public openmodalsearchandactions: boolean = false;

    @Input() isModem: boolean;

    private component: any;
    private title: string;

    constructor(public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() { }

    public domount(c: string, title: string) {
        this.title = title;
        this.systemHolderService.modaltitle = this.title;
        this.whatComponentAction(c);
    }

    private domountcomp(c: any) {
        this.component = {
            component: c,
            inputs: {
                nothing: null
            }
        }
        this.systemHolderService.modalcomponent = this.component;
        this.systemHolderService.modalactionserachopen = true;
    }

    public whatComponentAction(what: string) {
        switch (what) {
            case "reset-component":
                this.domountcomp(ResetComponent);
                break;
            case "factory-reset-component":
                this.domountcomp(FactoryResetComponent);
                break;
            case "ping-component":
                this.domountcomp(PingComponent);
                break;
            case "wifi-component":
                this.domountcomp(WifiComponent);
                break;
            case "auth-pppoe-component":
                this.domountcomp(AuthPPPoEComponent);
                break;
            case "sip-set-component":
                this.domountcomp(SipSetComponent);
                break;
            case "service-class-component":
                this.domountcomp(ServiceClassComponent);
                break;
            case "dhcp-component":
                this.domountcomp(DhcpComponent);
                break;
            case "app-ipv6":
                this.domountcomp(Ipv6Component);
                break;
            case "app-t38":
                this.domountcomp(T38Component);
                break;
        }
    }

}