import {AfterViewInit, Component, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


import {Router} from '@angular/router';
import {AllService} from "../../core/service/all.service";
import {LoginService} from "../../core/service/login.service";
import {Subscription} from "rxjs";
import {AccountService} from "../../core/service/account.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  animations: [
    trigger('logoChange', [
      // logo渐入渐出动画
      state('in', style({transform: 'translateX(0)'})),
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        // 进场动画
        animate(
          300,
          keyframes([
            style({width: '0', opacity: 0, offset: 0}), // 元素高度0，元素隐藏(透明度为0)，动画帧在0%
            style({width: '*', opacity: 1, offset: 1}) // 200ms后高度自适应展开，元素展开(透明度为1)，动画帧在100%
          ])
        )
      ]),
      transition('* => void', [
        // 出场动画
        animate(
          300,
          keyframes([
            style({width: '*', opacity: 1, offset: 0}), // 与之对应，让元素从显示到隐藏一个过渡
            style({width: '0', opacity: 0, offset: 1})
          ])
        )
      ]),

    ]),
  ]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  isCollapsed = false;

  btnLoading = false;

  account = null;

  subscribed: Array<Subscription> = [];
  // 面包屑显示
  breadcrumbState = true;

  // 左侧导航数据
  siderData = [
    {
      id: '1',
      icon: 'account-book',
      title: '账号管理',
      router: '/page/account',
      open: false,
      selected: false,
      childList: []
    }
  ];

  constructor(public allService: AllService,
              private router: Router,
              private loginService: LoginService,
              private accountService: AccountService) {
    // let account = JSON.parse(localStorage.getItem('account'));
  }

  ngOnInit() {
    this.getUserInfo();
  }

  // 订阅面包屑变化
  addBreadcrumbChange(): void {
    this.allService.getBreadcrumbState().subscribe((State) => {
      this.breadcrumbState = State;
    });
  }

  ngAfterViewInit() {
    // 异步更新方式
    Promise.resolve(null).then(() => {
      this.addBreadcrumbChange();
    });

  }

  // 点击退出登录
  clickOutLogin() {
    const $temp = this.loginService.loginOut(
    ).subscribe((data: any) => {
      this.btnLoading = false;
      console.log(data)
      if (data) {
        localStorage.removeItem('login');
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('state');
        this.router.navigate([`/login`]);
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.btnLoading = false;
    });
    // this.router.navigate(['/login']);
  }

  // 获取用户信息
  getUserInfo() {
    const $temp = this.loginService.getUserInfo(
    ).subscribe((data: any) => {
      this.btnLoading = false;
      if (data) {
        console.log('user:', data.data);
        localStorage.setItem('user', JSON.stringify(data.data));

        if (!localStorage.getItem('login')) {  // 未登录
          this.router.navigate([`/login`]);
        }
        this.account = localStorage.getItem("account");
      } else {
        this.router.navigate([`/login`]);
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      localStorage.setItem('state', '401');
      localStorage.removeItem('login');
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate([`/login`]);
      this.btnLoading = false;

    });
  }

  backDisplay(){
    this.router.navigate([`/page/account`]);
  }

  resetPassword() {
    const $temp = this.accountService.resetPwd(localStorage.getItem("account"),
      '111111'
    ).subscribe((data: any) => {
      console.log(data)
      if (data.code === '2000') {
        this.allService.createMessage("success", "密码重置成功")
      } else {
        this.allService.createMessage("error", "密码重置失败")

      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.btnLoading = false;
    });
  }


}
