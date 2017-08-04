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
import { DataTableModule } from 'angular-2-data-table';
import { MomentModule } from 'angular2-moment';


import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ResetComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DataTableModule,
    MomentModule
  ],
  providers: [
    ValidLoginService,
    HolderService,
    BuscaService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    BuscaComponent,
    LogsComponent
  ]
})
export class AppModule { }
