import { HolderService } from './../../../holder/holder.service';
import { InterfaceStatic } from './../../../../viewmodel/interfacestatic/interfacestatic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterfaceStaticsService } from './interface-static.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'interface-statics-component',
    templateUrl: 'interface-statics.component.html',
    styleUrls: ['interface-statics.component.css'],
    providers: [InterfaceStaticsService]
})

export class InterfaceStaticsComponent implements OnInit {

    private intStatic: InterfaceStatic;
    private searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private interfaceStaticsService: InterfaceStaticsService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.getInterfaceStatistics();
    }

    getInterfaceStatistics() {
        this.searching = true;
        this.interfaceStaticsService.getInterfaceStatistics(this.holderService.equipamento)
            .then(data => {
                this.intStatic = data;
                console.log(this.intStatic);
                this.searching = false;
            }, error => {
                console.log("erro ao buscar interface static");
                this.searching = false;
            });
    }


}