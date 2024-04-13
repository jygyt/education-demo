import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.less']
})
export class SuccessComponent implements OnInit {

  constructor(private service: SchoolService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate([`/index`])
    }, 3000);
  }

  report(){
    this.router.navigate([`/index`])
  }

}
