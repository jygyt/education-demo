import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IndexComponent} from "./index/index.component";
import { DetailComponent } from './detail/detail.component';
import {SharedModule} from '../shared.module';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {CarouselComponent} from "./carousel/carousel.component";
import { ReportComponent } from './report/report.component';
import {SuccessComponent} from "./success/success.component";

@NgModule({
  declarations: [
    IndexComponent,
    DetailComponent,
    CarouselComponent,
    ReportComponent,
    SuccessComponent
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
