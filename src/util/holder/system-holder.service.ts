import { Injectable } from '@angular/core';

@Injectable()
export class SystemHolderService {

    public ableMock: boolean = false;

    public whoMenuIsActive: string;

    public isSearchingCheckOnline: boolean = false;

    public isSearchingIp: boolean = false;

    public ablestatusmodem: boolean = false;

    public boxnameseewhatissearching: string;

    constructor() { }

}