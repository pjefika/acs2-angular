import { DetalheComponent } from './../detalhe/detalhe.component';
import { ResultTableComponent } from './../busca/result-table/result-table.component';
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
import { DataTablesModule } from 'angular-datatables';

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
    ResultTableComponent,
    DetalheComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ValidLoginService,
    HolderService,
    BuscaService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    BuscaComponent
  ]
})
export class AppModule { }
