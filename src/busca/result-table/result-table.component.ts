import { ListEqp } from './../../template/mock/mocklisteqp';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'result-table-component',
    templateUrl: 'result-table.component.html',
    styleUrls: ['result-table.component.css']
})

export class ResultTableComponent implements OnInit {

    @Input() list;

    dtOptions: any = {};

    constructor() {
    }

    ngOnInit() {
        this.putDtOp();
    }

    putDtOp() {
        this.dtOptions = {
            dom: "Bfrtip",
            buttons: [
                "colvis"
            ],
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $("td", row).unbind('click');
                $("td", row).bind("click", () => {
                    self.entrar(data);
                });
                return row;
            }
        }
    }

    entrar(data) {
        //Ação para entrar no detalhe do equipamento.
        //console.log(data);
    }
}