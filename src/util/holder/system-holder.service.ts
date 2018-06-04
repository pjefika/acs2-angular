import { Injectable } from '@angular/core';

@Injectable()
export class SystemHolderService {

    public ableMock: boolean = false;

    public whoMenuIsActive: string;

    public isSearchingCheckOnline: boolean = false;

    public isSearchingIp: boolean = false;

    public boxnameseewhatissearching: string;

    public isvivoone: boolean = false;    

    constructor() { }

}