import { Injectable } from '@angular/core';

@Injectable()
export class SystemHolderService {

    public ableMock: boolean = true;

    public whoMenuIsActive: string;

    public isSearchingCheckOnline: boolean = false;

    public isSearchingIp: boolean = false;

    public ablestatusmodem: boolean = false;

    public boxnameseewhatissearching: string;

    public isvivoone: boolean = false;

    constructor() { }

}