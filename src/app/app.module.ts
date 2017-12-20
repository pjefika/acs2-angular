import { ToastyComponent } from './../utils/toasty/toasty.component';
import { ToastyModule } from 'ng2-toasty';
import { UrlService } from './../utils/url-service/url.service';
import { CheckOnlineComponent } from './../utils/comandos/consultas/check-online/check-online.component';
import { HistoriaComponent } from './../utils/comandos/consultas/historia/historia.component';
import { DmzComponent } from './../utils/comandos/consultas/dmz/dmz.component';
import { SipGetComponent } from './../utils/comandos/consultas/sip/sip.component';
import { PortMappingComponent } from './../utils/comandos/consultas/port-mapping/port-mapping.component';
import { XdslComponent } from './../utils/comandos/consultas/xdsl/xdsl.component';
import { LanHostComponent } from './../utils/comandos/consultas/lan-host/lan-host.component';
import { InterfaceStaticsComponent } from './../utils/comandos/consultas/interface-statics/interface-statics.component';
import { WanComponent } from './../utils/comandos/consultas/wan/wan.component';
import { DhcpComponent } from './../utils/comandos/acoes/dhcp/dhcp.component';
import { ServiceClassComponent } from './../utils/comandos/acoes/service-class/service-class.component';
import { SipSetComponent } from './../utils/comandos/acoes/sip/sip.component';
import { AuthPPPoEComponent } from './../utils/comandos/acoes/auth-pppoe/auth-pppoe.component';
import { WifiComponent } from './../utils/comandos/acoes/wifi/wifi.component';
import { PingComponent } from './../utils/comandos/acoes/ping/ping.component';
import { FactoryResetComponent } from './../utils/comandos/acoes/factory-reset/factory-reset.component';
import { ResetComponent } from './../utils/comandos/acoes/reset/reset.component';
import { ResulTableEquipamentoComponent } from './../busca/result-table-equipamento/result-table-equipamento.component';
import { DetalheLogModalComponent } from './../logs/detalhe-log-modal/detalhe-log-modal.component';
import { ModalComponent } from './../utils/modal/modal.component';
import { ResultLogsTableComponent } from './../logs/result-table/result-logs-table.component';
import { LogsComponent } from './../logs/logs.component';
import { AcoesComponent } from './../detalhe/acoes/acoes.component';
import { ConsultasComponent } from './../detalhe/consultas/consultas.component';
import { EquipamentoComponent } from './../detalhe/equipamento/equipamento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './../utils/loading/loading.component';
import { DetalheComponent } from './../detalhe/detalhe.component';
import { DynamicComponent } from './../dynamiccomponent/dynamic.component';
import { BuscaComponent } from './../busca/busca.component';
import { BuscaService } from './../busca/busca.service';
import { HolderService } from './../utils/holder/holder.service';
import { MenuComponent } from './../utils/menu/menu.component';
import { AlertComponent } from './../utils/alert/alert.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { TemplateComponent } from './../template/template.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';
import { MomentModule } from 'angular2-moment';


import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicRouterComponent } from 'utils/dynamic-router/dynamic-router.component';
import { IdRouterComponent } from 'utils/id-router/id-router.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		TemplateComponent,
		AlertComponent,
		MenuComponent,
		BuscaComponent,
		DynamicComponent,
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
		ToastyComponent,
		SipSetComponent,
		SipGetComponent,
		DynamicRouterComponent,
		IdRouterComponent
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
		ValidLoginService,
		HolderService,
		BuscaService,
		UrlService
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
		SipGetComponent
	]
})
export class AppModule { }
