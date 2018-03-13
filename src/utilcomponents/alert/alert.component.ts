import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Mensagem } from 'viewmodel/mensagem/mensagem';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
})

export class AlertComponent implements OnInit, OnChanges {

    @Input() public mensagem: Mensagem;
    @Input() public ativo: boolean = false;
    @Input() public closeable: boolean = true;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() { }

    public ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.mensagem) {
            if (simpleChanges.mensagem.currentValue != simpleChanges.mensagem.previousValue) {
                // this.addMsg(simpleChanges.mensagem);
            }
        }
    }

    /**
    * adiciona mensagem ao local log de informações.
    */
    private addMsg(mensagem: any) {
        let now: number = Date.now();
        // if (!this.systemHolderService.mensagemAntigas) {
        //     this.systemHolderService.mensagemAntigas = [mensagem]
        // } else {
        //     this.systemHolderService.mensagemAntigas.push(mensagem);
        // }
    }



}