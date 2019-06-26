import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { Ipv6Service } from './ipv6.service';
import { IPV6 } from 'viewmodel/ipv6/ipv6';

@Component({
	selector: 'app-ipv6',
	templateUrl: './ipv6.component.html',
	styleUrls: ['./ipv6.component.css'],
	providers: [Ipv6Service]
})
export class Ipv6Component extends SuperComponentService implements OnInit {

	// 10722315437D

	public ipv6Model: IPV6;

	public isLoading: boolean = false;

	public loadingMenssage: string;

	constructor(private ipv6Service: Ipv6Service,
		public variavelHolderService: VariavelHolderService,
		public toastyComponent: ToastyComponent) {
		super(toastyComponent);
	}

	public ngOnInit() {
		this.getIPV6Status();
	}

	public getIPV6Status() {
		this.isLoading = true;
		this.loadingMenssage = "Consultando informações";
		this.ipv6Service
			.getIPV6Status(this.variavelHolderService.equipamento)
			.then(resposta => {
				this.ipv6Model = resposta;
			}, error => {
				this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
			})
			.then(() => {
				this.isLoading = false;
			});
	}

	public setIPV6Status() {
		this.isLoading = true;
		this.loadingMenssage = this.ipv6Model.enabled ? "Desativando " : "Ativando " + "IPV6";

		if (this.ipv6Model.enabled) {
			this.ipv6Model.enabled = false;
		} else {
			this.ipv6Model.enabled = true;
		}

		this.ipv6Service
			.setIPV6Status(this.variavelHolderService.equipamento, this.ipv6Model)
			.then(resposta => {

			}, error => {
				if (this.ipv6Model.enabled) {
					this.ipv6Model.enabled = false;
				} else {
					this.ipv6Model.enabled = true;
				}
				this.callToasty("Ops, aconteceu algo.", error.mError, "error", 0);
			})
			.then(() => {
				this.isLoading = false;
			});
	}

}
