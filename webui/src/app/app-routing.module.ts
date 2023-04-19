import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./route/layout/layout.component";
import {LoginComponent} from "./route/login/login.component";
import {AccountComponent} from "./route/account/account.component";
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {breadcrumb: '登录'}},
  // {path: 'page', component: LayoutComponent, data: {breadcrumb: '登录'}},
  {
    path: 'page',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},

      {path: 'account', component: AccountComponent, data: {breadcrumb: '账号管理'}},

    ]
  },
  {path: '**', redirectTo: 'page'}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
