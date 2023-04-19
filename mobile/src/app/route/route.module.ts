import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteModule { }
