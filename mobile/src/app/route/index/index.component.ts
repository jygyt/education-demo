import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../../../../webui/src/app/core/service/school.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  listOfData: Array<any> = [];
  state = {
    data: [],
    imgHeight: '150px'
  };
  inputValue=null
  isVisible=false
  detailInfo=null
  constructor(
    private service: SchoolService,
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
      res.data.forEach((item)=>{
        this.state.data.push(item.picBase64)
      })
      console.log(this.state.data)

    }, (errMsg) => {

    });
  }

  detail(data){
    this.detailInfo = data
    this.isVisible=true
  }

}
