import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared.module";
import {RouteModule} from "./route/route.module";
import {TokenInterceptor} from "./core/service/token.interceptor";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NgxEchartsModule} from "ngx-echarts";
import {OuiLoadService} from "./core/service/oui-load.service";
import {DragDropModule} from "@angular/cdk/drag-drop";


registerLocaleData(zh);
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
// export function get_settings(ouiLoadService: OuiLoadService) {
//   return () => ouiLoadService.getSettings();
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouteModule,
    NgxEchartsModule,
    PerfectScrollbarModule,
    DragDropModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    // { provide: APP_INITIALIZER, useFactory: get_settings, deps: [OuiLoadService], multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
