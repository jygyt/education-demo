import {Component, Input, OnInit} from '@angular/core';

// 空白内容区
@Component({
  selector: 'app-inner-content',
  templateUrl: './inner-content.component.html',
  styleUrls: ['./inner-content.component.less']
})
export class InnerContentComponent implements OnInit {

  // 是否需要小号内边距
  @Input() smallSpacing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
