import { CheckOnlineService } from './check-online.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'check-online-component',
    templateUrl: 'check-online.component.html',
    styleUrls: ['check-online.component.css'],
    providers: [CheckOnlineService]
})

export class CheckOnlineComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}