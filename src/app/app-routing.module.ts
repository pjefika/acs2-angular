import { TemplateComponent } from './../template/template.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'acs2', pathMatch: 'full' },
    { path: 'acs2/entrar', component: LoginComponent },
    { path: 'acs2', component: TemplateComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}