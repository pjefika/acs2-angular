import { Component, OnInit } from '@angular/core';
import { T38Service } from './t38.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { T38 } from 'viewmodel/t38/t38';
import { SystemHolderService } from 'util/holder/system-holder.service';

@Component({
	selector: 'app-t38',
	templateUrl: './t38.component.html',
	styleUrls: ['./t38.component.css'],
	providers: [T38Service]
})
export class T38Component extends SuperComponentService implements OnInit {

	// 140000110013514

	public t38Model: T38;

	public isLoading: boolean = false;

	public loadingMenssage: string;

	constructor(private t38Service: T38Service,
		public variavelHolderService: VariavelHolderService,
		public toastyComponent: ToastyComponent,
		public systemHolderService: SystemHolderService) {
		super(toastyComponent);
	}

	public ngOnInit() {
		this.getT38Status();
	}

	public getT38Status() {
		this.systemHolderService.btnIsLoadingAction = true;
		this.isLoading = true;
		this.loadingMenssage = "Consultando informações";
		this.t38Service
			.getT38Status(this.variavelHolderService.equipamento)
			.then(resposta => {
				this.t38Model = resposta;
			}, error => {
				this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
			})
			.then(() => {
				this.isLoading = false;
				this.systemHolderService.btnIsLoadingAction = false;
			});
	}

	public setT38Status() {
		this.isLoading = true;
		this.loadingMenssage = this.t38Model.enabled ? "Desativando " : "Ativando " + "T38";

		if (this.t38Model.enabled) {
			this.t38Model.enabled = false;
		} else {
			this.t38Model.enabled = true;
		}

		this.t38Service
			.setT38Status(this.variavelHolderService.equipamento, this.t38Model)
			.then(resposta => {

			}, error => {
				this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
				if (this.t38Model.enabled) {
					this.t38Model.enabled = false;
				} else {
					this.t38Model.enabled = true;
				}
			})
			.then(() => {
				this.isLoading = false;
			});
	}
}
