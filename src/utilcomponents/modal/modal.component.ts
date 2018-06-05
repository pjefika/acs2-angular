import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector } from '@angular/core';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})

export class ModalComponent implements OnInit {

    @Input() public openmodal: boolean;

    @Input() public title: any;

    // @Input() public component: any;

    currentComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    @Input() set componentData(data: { component: any, inputs: any }) {
        // console.log(this.openmodal);
        if (!data || !data.component || data.component === undefined || data.component === null) {
            return;
        }
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory(data.component);
        let component = factory.create(injector);
        this.dynamicComponentContainer.insert(component.hostView);
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
        this.currentComponent = component;
    }

    constructor(
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        private resolver: ComponentFactoryResolver) { }

    public ngOnInit() { }

    private validComponent() {
        // let valid: boolean = false;
        // if (this.variavelHolderService.checkOnline) {
        //     if (this.variavelHolderService.equipamento.type === 1) {
        //         if (this.nomeDoBtn === "Consultar SIP" || this.nomeDoBtn === "Configurar SIP") {
        //             valid = false;
        //         } else {
        //             valid = true;
        //         }
        //     } else {
        //         valid = false;
        //     }
        // } else {
        //     valid = true;
        // }
        // return valid;
    }

}