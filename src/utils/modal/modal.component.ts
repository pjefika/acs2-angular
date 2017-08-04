import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {

    @Input() modalTile: string;

    @Input() nomeDoBtn: string;
    @Input() styleBtn: string;
    @Input() disableBtn: boolean
    @Input() component: any;

    constructor(
        private modalService: NgbModal) { }

    ngOnInit() { }

    open(content) {
        this.modalService.open(content, { backdrop: 'static' })
    }

}