import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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
  buttonDisable = false

  openVisiable = false


  report = {
    isVisible: false,
  }
  constructor(
    private service: SchoolService, private messageService: NzMessageService,private fb: FormBuilder,private router: Router,
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
    const agent = navigator.userAgent.toLowerCase()
    const windows = agent.indexOf("win") > -1 || agent.indexOf("wow") > -1
    const Linux = String(navigator.platform).indexOf("Linux") > -1
    const mac = /macintosh|mac x/i.test(agent)
    const iOS = !!agent.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
    const android = agent.indexOf('android') > -1 || agent.indexOf('adr') > -1

    console.log(windows)
    console.log(mac)
    if(!windows) {
      window.location.href = 'http://www.bdjxw.cn/mobile/#/index';
      //this.router.navigate([`http://www/bdjxw.cn/mobile`]);
    } else {
      this.queryListForPage();
      this.queryUser();
      this.queryQuestion();
    }
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
    this.buttonDisable = true
    this.service.queryDescribe(data.id).subscribe((res: any) => {
      console.log(res)
      this.isVisible = true
      this.buttonDisable = false
      this.detailInfo = res.data

    }, (errMsg) => {
      this.buttonDisable = false
    });
    console.log(data)

  }

  saveReport(){
    for (const key in this.accountEditForm.controls) {
      this.accountEditForm.controls[key].markAsDirty();
      this.accountEditForm.controls[key].updateValueAndValidity();
    }
    this.service.addMessage(this.accountEditForm.value.realName,this.accountEditForm.value.phone,this.accountEditForm.value.address,this.accountEditForm.value.recommendUserId,this.accountEditForm.value.schoolId).subscribe((val)=>{
      this.report.isVisible = false
      this.messageService.create('success', '报名成功');
    })
  }

  queryQuestion(){
    this.service.queryListQuestion().subscribe((val)=>{
      this.listOfQuestion = val.data
    })
  }

  openModel(){
    this.openVisiable = true
  }

}
