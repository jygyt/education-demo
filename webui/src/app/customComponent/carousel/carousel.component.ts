// carousel.component.ts
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit,OnDestroy{
  @Input() images: Array<any> = [];
  currentIndex = 0;

  intervalId = null

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  next(){
    if(this.currentIndex+1 === this.images.length){
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex +1
    }
  }

  formatString(value) {
    if (value == null || value == "" || value == undefined) {
      return "";
    } else {
      var str = value.replace(/\ +/g, "");
      str = str.replace(/[\r\n]/g, "");
      return str;
    }
  }
}
