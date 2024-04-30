import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SchoolService} from "../../core/service/school.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
declare var Swiper: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit,AfterViewInit {
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
  currentItem = null

  // 轮播数据
  swiperList: any[] = [];



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
      this.queryUser();
      this.queryQuestion();
      this.swiperInit();
    }
  }

  ngAfterViewInit(): void {
    this.queryListForPage();
  }

  swiperInit() {
    // tslint:disable-next-line: no-unused-expression
    // const swiper = new Swiper(this.swiperContainer.nativeElement, {
    //   // 在这里配置你的Swiper选项...
    // });
    new Swiper ('.swiper-container', {
      direction: 'horizontal', // 水平切换选项
      loop: true, // 循环模式选项
      speed: 6, // 滑动时间
      grabCursor: true, // 鼠标指针形状
      autoplay: {
        delay: 1500,
        stopOnLastSlide: false,
        disableOnInteraction: false // 手动滑动之后依然自动轮播
      }, // 自动滑动
      effect : 'fade', // 切换效果
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      // navigation: {  // 分页器
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      // },
      // pagination: { // 如果需要前进后退按钮
      //     el: '.swiper-pagination',
      // },
      // scrollbar: { // 如果需要滚动条
      //     el: '.swiper-scrollbar',
      // }
    });
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
        // const imgUrl = {
        //   imgUrl: 'data:image/jpeg;base64,'+ this.formatString(x.picBase64)
        // }
        // this.swiperList.push(imgUrl);
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

  openModel(item){
    this.currentItem = item;
    this.openVisiable = true
  }

}
