import { DetalheComponent } from './../detalhe/detalhe.component';
import { TemplateComponent } from './../template/template.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdRouterComponent } from 'utils/id-router/id-router.component';
const routes: Routes = [
    { path: 'entrar', component: LoginComponent },
    { path: '', component: TemplateComponent },
    { path: 'searchEqp/:id', component: IdRouterComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}