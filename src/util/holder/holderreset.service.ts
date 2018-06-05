import { Injectable } from '@angular/core';
import { SystemHolderService } from './system-holder.service';
import { VariavelHolderService } from './variavel-holder.service';

@Injectable()
export class HolderResetService {

    constructor(public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) { }

    public reset() { }

    private resetVariavelHolder() { }

    private resetSystemHolder() { }

}