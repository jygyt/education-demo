import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Base64 } from 'js-base64';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  detail: any = null
  constructor(
    private activate: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activate.params.subscribe(
      (params: Params) => {
        this.detail = JSON.parse(Base64.decode(params.data))
        console.log(this.detail)
      })
  }

  onLeftClick() {
  history.back()
  }

}
