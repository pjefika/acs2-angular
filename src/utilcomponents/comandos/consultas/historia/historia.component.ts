// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoriaService } from './historia.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'historia-component',
    templateUrl: 'historia.component.html',
    styleUrls: ['historia.component.css'],
    providers: [HistoriaService]
})

export class HistoriaComponent implements OnInit {
    
    constructor(
        // public activeModal: NgbActiveModal
    ) { }

    ngOnInit() { }
}