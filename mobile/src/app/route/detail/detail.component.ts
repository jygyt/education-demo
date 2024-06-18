import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Base64 } from 'js-base64';
import {SchoolService} from "../../core/service/school.service";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  detail: any = null
  constructor(
    private router: Router,
    private activate: ActivatedRoute,
    private service: SchoolService
  ) { }

  ngOnInit() {
    this.activate.params.subscribe(
      (params: Params) => {
        const id = JSON.parse(Base64.decode(params.data))
        console.log(this.detail)
        this.getSchoolDetail(id.id)
      })
  }

  onLeftClick() {
    this.router.navigate([`/index`])
  // history.back()
  //   location.reload();
  }

  getSchoolDetail(id){
    this.service.queryDescribe(id).subscribe((val)=>{
      this.detail = val.data
    })
  }

}
