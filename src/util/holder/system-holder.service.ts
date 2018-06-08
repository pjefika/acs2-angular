import { Injectable } from '@angular/core';

@Injectable()
export class SystemHolderService {

    public ableMock: boolean = false;

    public whoMenuIsActive: string;

    public isSearchingCheckOnline: boolean = false; // está validando check online

    public isSearchingIp: boolean = false; // esta validando ip

    public issearchingmodem: boolean = false; // esta buscando modem

    public boxnameseewhatissearching: string;

    public isvivoone: boolean = false;

    public modalactionserachopen: boolean = false;

    public modalcomponent: any;    
    public modaltitle: string;    

    constructor() { }

}