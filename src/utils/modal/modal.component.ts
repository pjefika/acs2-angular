import { HistoriaComponent } from './../comandos/consultas/historia/historia.component';
import { DmzComponent } from './../comandos/consultas/dmz/dmz.component';
import { SipConsultaComponent } from './../comandos/consultas/sip/sip.component';
import { PortMappingComponent } from './../comandos/consultas/port-mapping/port-mapping.component';
import { XdslComponent } from './../comandos/consultas/xdsl/xdsl.component';
import { LanHostComponent } from './../comandos/consultas/lan-host/lan-host.component';
import { InterfaceStaticsComponent } from './../comandos/consultas/interface-statics/interface-statics.component';
import { WanComponent } from './../comandos/consultas/wan/wan.component';
import { DhcpComponent } from './../comandos/acoes/dhcp/dhcp.component';
import { ServiceClassComponent } from './../comandos/acoes/service-class/service-class.component';
import { SipComponent } from './../comandos/acoes/sip/sip.component';
import { AuthPPPoEComponent } from './../comandos/acoes/auth-pppoe/auth-pppoe.component';
import { WifiComponent } from './../comandos/acoes/wifi/wifi.component';
import { PingComponent } from './../comandos/acoes/ping/ping.component';
import { FactoryResetComponent } from './../comandos/acoes/factory-reset/factory-reset.component';
import { ResetComponent } from './../comandos/acoes/reset/reset.component';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {

    @Input() nomeDoBtn: string;
    @Input() styleBtn: string;
    @Input() disableBtn: boolean
    @Input() component: any;

    constructor(
        private modalService: NgbModal) { }

    ngOnInit() {
        this.whatComponentAction();
        this.whatComponentSearch();
    }

    whatComponentAction() {
        switch (this.component) {
            case "reset-component":
                this.component = ResetComponent;
                break;
            case "factory-reset-component":
                this.component = FactoryResetComponent
                break;
            case "ping-component":
                this.component = PingComponent
                break;
            case "wifi-component":
                this.component = WifiComponent
                break;
            case "auth-pppoe-component":
                this.component = AuthPPPoEComponent
                break;
            case "sip-componen":
                this.component = SipComponent
                break;
            case "service-class-component":
                this.component = ServiceClassComponent
                break;
            case "dhcp-component":
                this.component = DhcpComponent
                break;
        }
    }

    whatComponentSearch() {
        switch (this.component) {
            case "wan-component":
                this.component = WanComponent
                break;
            case "interface-statics-component":
                this.component = InterfaceStaticsComponent
                break;
            case "lan-host-component":
                this.component = LanHostComponent
                break;
            case "xdsl-component":
                this.component = XdslComponent
                break;
            case "port-mapping-component":
                this.component = PortMappingComponent
                break;
            case "sip-consulta-component":
                this.component = SipConsultaComponent
                break;
            case "dmz-component":
                this.component = DmzComponent
                break;
            case "historia-component":
                this.component = HistoriaComponent
                break;
        }
    }

    open() {
        this.modalService.open(this.component, { backdrop: 'static' })
    }

}