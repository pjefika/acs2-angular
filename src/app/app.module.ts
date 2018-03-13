import { ToastyModule } from 'ng2-toasty';
import { ResulTableEquipamentoComponent } from './../busca/result-table-equipamento/result-table-equipamento.component';
import { DetalheLogModalComponent } from './../logs/detalhe-log-modal/detalhe-log-modal.component';
import { ResultLogsTableComponent } from './../logs/result-table/result-logs-table.component';
import { LogsComponent } from './../logs/logs.component';
import { AcoesComponent } from './../detalhe/acoes/acoes.component';
import { ConsultasComponent } from './../detalhe/consultas/consultas.component';
import { EquipamentoComponent } from './../detalhe/equipamento/equipamento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalheComponent } from './../detalhe/detalhe.component';
import { BuscaComponent } from './../busca/busca.component';
import { BuscaService } from './../busca/busca.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TemplateComponent } from './../template/template.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';
import { MomentModule } from 'angular2-moment';


import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'utilcomponents/alert/alert.component';
import { ToastyComponent } from 'utilcomponents/toasty/toasty.component';
import { HolderResetService } from 'util/holder/holderreset.service';
import { VariavelHolderService } from 'util/holder/variavel-holder.service';
import { SystemHolderService } from 'util/holder/system-holder.service';
import { UtilService } from 'util/util.service';
import { UrlService } from 'util/urlservice/url.service';
import { SuperService } from 'util/superservice/super.service';
import { AlertService } from 'util/alert/alert.service';
import { SuperComponentService } from 'util/supercomponent/super-component.service';
import { DynamicRouterService } from 'utilcomponents/dynamicrouter/dynamic-router.service';
import { DynamicComponent } from 'utilcomponents/dynamiccomponent/dynamic.component';
import { LoadingComponent } from 'utilcomponents/loading/loading.component';
import { ResetComponent } from 'utilcomponents/comandos/acoes/reset/reset.component';
import { FactoryResetComponent } from 'utilcomponents/comandos/acoes/factory-reset/factory-reset.component';
import { PingComponent } from 'utilcomponents/comandos/acoes/ping/ping.component';
import { WifiComponent } from 'utilcomponents/comandos/acoes/wifi/wifi.component';
import { AuthPPPoEComponent } from 'utilcomponents/comandos/acoes/auth-pppoe/auth-pppoe.component';
import { ServiceClassComponent } from 'utilcomponents/comandos/acoes/service-class/service-class.component';
import { DhcpComponent } from 'utilcomponents/comandos/acoes/dhcp/dhcp.component';
import { WanComponent } from 'utilcomponents/comandos/consultas/wan/wan.component';
import { InterfaceStaticsComponent } from 'utilcomponents/comandos/consultas/interface-statics/interface-statics.component';
import { LanHostComponent } from 'utilcomponents/comandos/consultas/lan-host/lan-host.component';
import { XdslComponent } from 'utilcomponents/comandos/consultas/xdsl/xdsl.component';
import { PortMappingComponent } from 'utilcomponents/comandos/consultas/port-mapping/port-mapping.component';
import { DmzComponent } from 'utilcomponents/comandos/consultas/dmz/dmz.component';
import { HistoriaComponent } from 'utilcomponents/comandos/consultas/historia/historia.component';
import { CheckOnlineComponent } from 'utilcomponents/comandos/consultas/check-online/check-online.component';
import { SipSetComponent } from 'utilcomponents/comandos/acoes/sip/sip.component';
import { SipGetComponent } from 'utilcomponents/comandos/consultas/sip/sip.component';
import { MenuComponent } from 'utilcomponents/menu/menu.component';
import { ModalComponent } from 'utilcomponents/modal/modal.component';
import { IdRouterComponent } from 'utilcomponents/id-router/id-router.component';
import { DynamicRouterComponent } from 'utilcomponents/dynamicrouter/dynamic-router.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		TemplateComponent,
		MenuComponent,
		BuscaComponent,
		DynamicComponent,
		DynamicRouterComponent,
		DetalheComponent,
		LoadingComponent,
		EquipamentoComponent,
		ConsultasComponent,
		AcoesComponent,
		LogsComponent,
		ResultLogsTableComponent,
		ModalComponent,
		DetalheLogModalComponent,
		ResulTableEquipamentoComponent,
		ResetComponent,
		FactoryResetComponent,
		PingComponent,
		WifiComponent,
		AuthPPPoEComponent,
		ServiceClassComponent,
		DhcpComponent,
		WanComponent,
		InterfaceStaticsComponent,
		LanHostComponent,
		XdslComponent,
		PortMappingComponent,
		DmzComponent,
		HistoriaComponent,
		CheckOnlineComponent,
		SipSetComponent,
		SipGetComponent,
		IdRouterComponent,
		AlertComponent,
		ToastyComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		AppRoutingModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		DataTableModule,
		MomentModule,
		ToastyModule.forRoot()
	],
	providers: [
		BuscaService,
		UrlService,
		HolderResetService,
		VariavelHolderService,
		SystemHolderService,
		UtilService,
		SuperService,
		AlertService,
		SuperComponentService,
		ToastyComponent,
		DynamicRouterService
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	entryComponents: [
		DetalheComponent,
		BuscaComponent,
		LogsComponent,
		ResetComponent,
		FactoryResetComponent,
		PingComponent,
		WifiComponent,
		AuthPPPoEComponent,
		ServiceClassComponent,
		DhcpComponent,
		WanComponent,
		InterfaceStaticsComponent,
		LanHostComponent,
		XdslComponent,
		PortMappingComponent,
		DmzComponent,
		HistoriaComponent,
		CheckOnlineComponent,
		SipSetComponent,
		SipGetComponent,
		AlertComponent,
		ToastyComponent
	]
})
export class AppModule { }
