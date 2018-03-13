import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SystemHolderService } from './holder/system-holder.service';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class UtilService {

    constructor(private router: Router,
        public systemHolderService: SystemHolderService) { }

    public isLogado(): Promise<boolean> {
        let localObj = JSON.parse(sessionStorage.getItem("user"));
        if (typeof (Storage) !== "undefined" && localObj && localObj.token === Md5.hashStr("fulltest-app")) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    public getNv(nv: number): boolean {
        let valid = false;
        if (this.isLogado()) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv >= nv) {
                valid = true;
            }
        }
        return valid;
    }

    // Navega para menu passado por parametro.
    public navigate(route: string) {
        this.router.navigate([route]);
    }

}