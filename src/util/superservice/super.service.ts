import { Injectable } from '@angular/core';
import { InfoRequest } from 'viewmodel/inforequest/inforequest';
import { ExceptionService } from '../exceptionservice/exception.service';

@Injectable()
export class SuperService extends ExceptionService {

    public infoResquest: InfoRequest;

    constructor() {
        super();
    }
}