import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {Router} from "@angular/router";
import {ToastService} from "ng-zorro-antd-mobile";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  listOfData: Array<any> = [];
  listOfDataSchool: Array<any> = [];
  listOfUser: Array<any> = [];
  currentRealName = null
  currentPhone = null
  currentAddress = null
  currentRecommendUserId = null
  currentSchoolId = null
  name3 = '选择';
  name4 = '选择';

  value3 = [];
  value4 = [];
  constructor(private service: SchoolService, private router: Router,private _toast: ToastService) { }

  ngOnInit() {
    this.queryListForPage();
    this.queryUser();
  }
  onLeftClick() {
    history.back()
    }

  onOk3(result) {
    console.log(result)
    this.name3 = result[0].label;
    this.currentSchoolId = result[0].value;
  }
  onOk4(result) {
    console.log(result)
    this.name4 = result[0].label;
    this.currentRecommendUserId = result[0].value;
  }

  queryListForPage() {
    this.service.queryListSchool().subscribe((res: any) => {
      if(res.data){
        res.data.forEach((item) => {
          if(item.schoolName){
            const temp = {
              label: item.schoolName,
              value: item.id
            }
            this.listOfDataSchool.push(temp);
          }
        })
      }

    }, (errMsg) => {

    });
  }

  queryUser(){
    this.service.queryListRecommend().subscribe((val) => {
      if(val.data){
        val.data.forEach((item) => {
          const temp = {
            label: item.realName,
            value: item.id
          }
          this.listOfUser.push(temp);
        })
      }
    })
  }

  report(){
    if(this.currentRealName&&this.currentPhone){
      this.service.addMessage(this.currentRealName,this.currentPhone,this.currentAddress,this.currentRecommendUserId,this.currentSchoolId).subscribe((val)=>{
        this.router.navigate([`/success`])
      })
    } else {
      this._toast.fail("请填写姓名和电话");
    }

  }



}
