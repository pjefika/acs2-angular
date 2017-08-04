import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'detalhe-log-modal',
    templateUrl: 'detalhe-log-modal.component.html',
    styleUrls: ['detalhe-log-modal.component.css']
})

export class DetalheLogModalComponent implements OnInit {

    @Input() eqp: {
        deviceGUID: number,
        serialNumber: string,
        ipAdress: string,
        macAddress: string,
        manufacturer: string,
        modelName: string,
        subscriberID: string,
    };

    constructor() { }

    ngOnInit() { }

}