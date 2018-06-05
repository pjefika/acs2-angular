import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';

@Injectable()
export class SuperComponentService extends AlertService {

    constructor(public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }


}