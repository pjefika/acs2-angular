import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DhcpService } from './dhcp.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dhcp-component',
    templateUrl: 'dhcp.component.html',
    styleUrls: ['dhcp.component.css'],
    providers: [DhcpService]
})

export class DhcpComponent implements OnInit {
    
    constructor(
        public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    configurar() {
        console.log("Dhcp Fake");
        
    }
}