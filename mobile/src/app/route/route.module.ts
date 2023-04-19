import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared.module';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";


@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    FormsModule,
    NgZorroAntdMobileModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class RouteModule { }
