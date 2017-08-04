import { TemplateComponent } from './../../template/template.component';
import { HolderService } from './../../../../FulltestNode/src/util/holder/holder.service';
import { MockListMenu } from './../../template/mock/mocklistmenu';
import { Menu } from './../../viewmodel/mock/template/menu';
import { Component, OnInit } from '@angular/core';

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
        private templateComponent: TemplateComponent) { }

    ngOnInit() { }

    abreCompoent(l) {
        switch (l.component) {
            case "busca-component":
                this.templateComponent.buscaEquipamento();
                break;
            case "logs-component":
                this.templateComponent.createLogsComponent();
                break;
        }
    }

    sair() {
        this.templateComponent.sair();
    }

    activeMenu(l): Boolean {
        //console.log(l);
        let active = false;
        if (l.component === this.holderService.whoSubNavIsActive) {
            active = true;
        }
        return active;
    }

}