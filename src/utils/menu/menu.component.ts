import { HolderService } from './../holder/holder.service';
import { TemplateComponent } from './../../template/template.component';
import { MockListMenu } from './../../template/mock/mocklistmenu';
import { Menu } from './../../viewmodel/mock/template/menu';
import { Component, OnInit } from '@angular/core';
import { DynamicRouterHolderService } from 'utils/dynamic-router/dynamic-router-holder.service';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css'],
    providers: [HolderService]
})

export class MenuComponent implements OnInit {

    menus: Menu[] = MockListMenu;

    constructor(
        private holderService: HolderService,
        private templateComponent: TemplateComponent,
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    public ngOnInit() { }

    private abreCompoent(l) {        
        this.dynamicRouterHolderService.component = l.component;
    }

    sair() {
        this.templateComponent.sair();
    }

    activeMenu(l): Boolean {
        //console.log(l);
        let active = false;
        if (l.component === this.holderService.whoMenuIsActive) {
            active = true;
        }
        return active;
    }

}