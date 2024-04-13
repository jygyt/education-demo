import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./route/index/index.component";
import { DetailComponent } from './route/detail/detail.component';
import { ReportComponent } from './route/report/report.component';
import {SuccessComponent} from "./route/success/success.component";
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent, data: { breadcrumb: '首页' } },
  { path: 'detail/:data', component: DetailComponent, data: { breadcrumb: '详情' } },

  { path: 'report', component: ReportComponent, data: { breadcrumb: '报名' } },
  { path: 'success', component: SuccessComponent, data: { breadcrumb: '成功' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
