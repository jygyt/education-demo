import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
listOfData: Array<any> = [];
  array = [1, 2, 3, 4];
  detailInfo= null;
  isVisible=false
  inputValue=null
  constructor(
    private service: SchoolService, private messageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.queryListForPage();
  }
  // 显示base64图片, 出错unsafe后-去掉字符串中的空格和换行
  formatString(value) {
    if (value == null || value == "" || value == undefined) {
      return "";
    } else {
      var str = value.replace(/\ +/g, "");
      str = str.replace(/[\r\n]/g, "");
      return str;
    }
  }


  queryListForPage() {
    this.service.queryListSchool().subscribe((res: any) => {
      this.listOfData = res.data

    }, (errMsg) => {

    });
  }

  detail(data){
    console.log(data)
    this.detailInfo = data
    this.isVisible=true
  }

}
