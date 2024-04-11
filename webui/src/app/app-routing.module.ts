import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./route/layout/layout.component";
import {LoginComponent} from "./route/login/login.component";
import {AccountComponent} from "./route/account/account.component";
import {SchoolDetailComponent} from "./route/school-detail/school-detail.component";
import {MessageComponent} from "./route/message/message.component";
import {IndexComponent} from "./route/index/index.component";
const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {breadcrumb: '登录'}},
  {path: 'index', component: IndexComponent, data: {breadcrumb: '测试管理'}},
  // {path: 'page', component: LayoutComponent, data: {breadcrumb: '登录'}},
  {
    path: 'page',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},

      {path: 'account', component: AccountComponent, data: {breadcrumb: '账号管理'}},
      {path: 'school', component: SchoolDetailComponent, data: {breadcrumb: '学校管理'}},
      {path: 'message', component: MessageComponent, data: {breadcrumb: '留言管理'}},
    ]
  },
  {path: '**', redirectTo: 'page'}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
