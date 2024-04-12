import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {SiderMenuComponent} from './layout/sider-menu/sider-menu.component';
import {IndexComponent} from './index/index.component';
import {SharedModule} from "../shared.module";
import {AccountComponent} from './account/account.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {DashboardLayoutModule} from "@syncfusion/ej2-angular-layouts";
import {InnerContentComponent} from "./inner-content/inner-content.component";
import {DelonFormModule} from "@delon/form";
import {DelonABCModule} from "@delon/abc";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SchoolDetailComponent} from "./school-detail/school-detail.component";
import {QuillEditorComponent} from "../customComponent/quill-editor/quill-editor.component";
import {QuillModule} from "ngx-quill";
import {MessageComponent} from "./message/message.component";
import {RecommendComponent} from "./recommend-user/recommend.component";
import {SelfTalkComponent} from "./self-talk/self-talk.component";
import {CarouselComponent} from "../customComponent/carousel/carousel.component";

@NgModule({
  declarations: [
    LoginComponent,
    RecommendComponent,
    SelfTalkComponent,
    LayoutComponent,
    SiderMenuComponent,
    IndexComponent,
    AccountComponent,
    InnerContentComponent,
    SchoolDetailComponent,
    MessageComponent,
    QuillEditorComponent,
    CarouselComponent
  ],
  exports: [
    SiderMenuComponent
  ],
  imports: [
    SharedModule,
    PerfectScrollbarModule,
    DashboardLayoutModule,
    DelonFormModule.forRoot(),
    DelonABCModule,
    DragDropModule,
    QuillModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteModule { }
