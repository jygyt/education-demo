import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IndexComponent} from "./index/index.component";
import {SharedModule} from '../shared.module';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";

@NgModule({
  declarations: [
    IndexComponent
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
