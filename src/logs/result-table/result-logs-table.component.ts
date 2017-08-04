import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'result-logs-table-component',
    templateUrl: 'result-logs-table.component.html',
    styleUrls: ['result-logs-table.component.css']
})

export class ResultLogsTableComponent implements OnInit {

    @Input() list;
    modalContent: {
        title: string,
        body: any
    }

    logs: [{
        login: string,
        acao: string,
        data: string
    }];

    constructor() { }

    ngOnInit() {
        this.mockTheLog();
    }

    mockTheLog() {
        let log1 = { login: "12312313", acao: "Acção1", data: "03/08/2017 17:23" }
        let log2 = { login: "53453453", acao: "Acção2", data: "03/08/2017 17:23" }
        let log3 = { login: "64565436", acao: "Acção3", data: "03/08/2017 17:23" }
        this.logs = [log1];
        this.logs.push(log2);
        this.logs.push(log3);
    }
}