import { TemplateComponent } from './../../template/template.component';
import { MockListMenu } from './../../template/mock/mocklistmenu';
import { Menu } from './../../viewmodel/mock/template/menu';
import { Component, OnInit } from '@angular/core';
import { DynamicRouterService } from 'utilcomponents/dynamicrouter/dynamic-router.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {

    menus: Menu[] = MockListMenu;

    constructor(
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        private templateComponent: TemplateComponent,
        public dynamicRouterService: DynamicRouterService) { }

    public ngOnInit() { }

    private abreCompoent(l) {
        this.templateComponent.setToDynamicComponent(l.component);
    }

    private sair() {
        this.templateComponent.sair();
    }

    activeMenu(l): Boolean {
        //console.log(l);
        let active = false;
        if (l.component === this.systemHolderService.whoMenuIsActive) {
            active = true;
        }
        return active;
    }

}