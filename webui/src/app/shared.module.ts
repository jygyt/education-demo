import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';
import {SafeHtmlPipe} from './core/pipe/SafeHtml.pipe';
import {AngularSplitModule} from 'angular-split';
import {BigScreenModule} from 'angular-bigscreen';
import {SortablejsModule} from 'ngx-sortablejs';
import {DelonFormModule} from "@delon/form";
import {DelonABCModule} from "@delon/abc";



@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CoreModule,
    AngularSplitModule.forRoot(),
    BigScreenModule,
    SortablejsModule,
    DelonFormModule.forRoot(),
    DelonABCModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CoreModule,
    AngularSplitModule,
    BigScreenModule,
    SortablejsModule,
  ]
})
export class SharedModule {
}
