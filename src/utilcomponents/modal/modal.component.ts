import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
import { WanComponent } from 'utilcomponents/comandos/consultas/wan/wan.component';
import { InterfaceStaticsComponent } from 'utilcomponents/comandos/consultas/interface-statics/interface-statics.component';
import { LanHostComponent } from 'utilcomponents/comandos/consultas/lan-host/lan-host.component';
import { XdslComponent } from 'utilcomponents/comandos/consultas/xdsl/xdsl.component';
import { PortMappingComponent } from 'utilcomponents/comandos/consultas/port-mapping/port-mapping.component';
import { SipGetComponent } from 'utilcomponents/comandos/consultas/sip/sip.component';
import { DmzComponent } from 'utilcomponents/comandos/consultas/dmz/dmz.component';
import { HistoriaComponent } from 'utilcomponents/comandos/consultas/historia/historia.component';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})

export class ModalComponent implements OnInit {

    @Input() nomeDoBtn: string;
    @Input() styleBtn: string;
    @Input() component: any;

    private modalOptions: {
        backdrop?: boolean | 'static',
        size?: 'sm' | 'lg'
    }

    constructor(
        private modalService: NgbModal,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        this.whatComponentAction();
        this.whatComponentSearch();
    }

    public whatComponentAction() {
        switch (this.component) {
            case "reset-component":
                this.component = ResetComponent;
                this.setModalOptions("static", "sm");
                break;
            case "factory-reset-component":
                this.component = FactoryResetComponent
                this.setModalOptions("static", "sm");
                break;
            case "ping-component":
                this.component = PingComponent
                this.setModalOptions("static");
                break;
            case "wifi-component":
                this.component = WifiComponent
                this.setModalOptions("static");
                break;
            case "auth-pppoe-component":
                this.component = AuthPPPoEComponent
                this.setModalOptions("static");
                break;
            case "sip-set-component":
                this.component = SipSetComponent
                break;
            case "service-class-component":
                this.component = ServiceClassComponent
                this.setModalOptions("static");
                break;
            case "dhcp-component":
                this.component = DhcpComponent
                this.setModalOptions("static");
                break;
        }
    }

    public whatComponentSearch() {
        switch (this.component) {
            case "wan-component":
                this.component = WanComponent
                this.setModalOptions("static");
                break;
            case "interface-statics-component":
                this.component = InterfaceStaticsComponent
                this.setModalOptions("static", "lg");
                break;
            case "lan-host-component":
                this.component = LanHostComponent
                this.setModalOptions("static", "lg");
                break;
            case "xdsl-component":
                this.component = XdslComponent
                this.setModalOptions("static");
                break;
            case "port-mapping-component":
                this.component = PortMappingComponent
                this.setModalOptions("static", "lg")
                break;
            case "sip-get-component":
                this.component = SipGetComponent
                break;
            case "dmz-component":
                this.component = DmzComponent
                break;
            case "historia-component":
                this.component = HistoriaComponent
                break;
        }
    }

    public setModalOptions(bdname: boolean | 'static', sz?: 'sm' | 'lg') {
        this.modalOptions = {
            backdrop: bdname,
            size: sz
        }
    }

    public open() {
        if (this.variavelHolderService.checkOnline) {
            this.modalService.open(this.component, this.modalOptions)
        }
    }

    private validComponent() {
        let valid: boolean = false;
        if (this.variavelHolderService.checkOnline) {
            console.log("isOnline");
            if (this.variavelHolderService.equipamento.type === 1) {
                if (this.nomeDoBtn === "Consultar SIP" || this.nomeDoBtn === "Configurar SIP") {
                    valid = false;
                } else {
                    valid = true;
                }
            } else {
                valid = false;
            }
        } else {
            valid = true;
        }
        return valid;
    }

}