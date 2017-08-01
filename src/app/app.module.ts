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
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
    AlertComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ValidLoginService,
    HolderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
