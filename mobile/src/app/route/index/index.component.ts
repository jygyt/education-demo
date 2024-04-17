import { Component, OnInit } from '@angular/core';
import { SchoolService } from "../../core/service/school.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Base64 } from "js-base64";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  listOfData: Array<any> = [];
  listOfDataSchool: Array<any> = [];
  state = {
    data: [],
    imgHeight: '150px'
  };
  inputValue = null
  isVisible = false
  detailInfo = null

  listOfQuestion: Array<any> = [];
  constructor(
    private service: SchoolService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.queryListForPage();

    this.queryQuestion();
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
    this.service.queryListSchoolSlow().subscribe((res: any) => {
      this.listOfData = res.data
      res.data.forEach((item) => {
        this.state.data.push(item.picBase64)
        if(item.schoolName){
          this.listOfDataSchool.push(item);
        }
      })

      console.log(this.state.data)

    }, (errMsg) => {

    });
  }

  detail(data) {
    console.log(data)

    const param = Base64.encodeURI(JSON.stringify(data));
    this.router.navigate([`/detail`, param])

  }

  detailQuestion(data) {
    console.log(data)

    const param = Base64.encodeURI(JSON.stringify(data));
    this.router.navigate([`/detail-question`, param])

  }

  openReport() {
    this.router.navigate([`/report`])
  }

  queryQuestion(){
    this.service.queryListQuestion().subscribe((val)=>{
      this.listOfQuestion = val.data
    })
  }

}
