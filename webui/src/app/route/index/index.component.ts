import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
listOfData: Array<any> = [];
  listOfDataSchool: Array<any> = [];
  listOfUser: Array<any> = [];
  listOfQuestion: Array<any> = [];
  array = [1, 2, 3, 4];
  detailInfo= null;
  isVisible=false
  inputValue=null
  accountEditForm: FormGroup;


  report = {
    isVisible: false,
  }
  constructor(
    private service: SchoolService, private messageService: NzMessageService,private fb: FormBuilder
  ) {
    this.accountEditForm = this.fb.group({
      realName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      recommendUserId: [null],
      schoolId: [null],
    });
  }

  ngOnInit() {
    this.queryListForPage();
    this.queryUser();
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
    this.service.queryListSchool().subscribe((res: any) => {
      this.listOfData = res.data

      this.listOfData.forEach(x => {
        if(x.schoolName){
          this.listOfDataSchool.push(x);
        }
      })

    }, (errMsg) => {

    });
  }

  queryUser(){
    this.service.queryListRecommend().subscribe((val) => {
      this.listOfUser = val.data
    })
  }

  openReport() {
    this.report.isVisible = true;
  }

  detail(data){
    console.log(data)
    this.detailInfo = data
    this.isVisible=true
  }

  saveReport(){
    for (const key in this.accountEditForm.controls) {
      this.accountEditForm.controls[key].markAsDirty();
      this.accountEditForm.controls[key].updateValueAndValidity();
    }
    this.service.addMessage(this.accountEditForm.value.realName,this.accountEditForm.value.phone,this.accountEditForm.value.address,this.accountEditForm.value.recommendUserId,this.accountEditForm.value.schoolId).subscribe((val)=>{
      this.report.isVisible = false
    })
  }

  queryQuestion(){
    this.service.queryListQuestion().subscribe((val)=>{
      this.listOfQuestion = val.data
    })
  }

}
