import { LogsService } from './logs.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'logs-component',
    templateUrl: 'logs.component.html',
    styleUrls: ['logs.component.css'],
    providers: [LogsService]
})

export class LogsComponent implements OnInit {

    toggleSearch: string = "";
    inputSearch: string;

    constructor() { }

    ngOnInit() { }

}