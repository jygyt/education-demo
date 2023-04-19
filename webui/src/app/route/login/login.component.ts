import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NzModalService} from 'ng-zorro-antd';
import {Subscription} from 'rxjs';
import {LoginService} from '../../core/service/login.service';
import {AllService} from '../../core/service/all.service';
import {Base64} from 'js-base64';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  subscribed: Array<Subscription> = [];

  btnLoading = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private service: AllService,
              public loginSevice: LoginService,
              private titleService: Title,
              private activate: ActivatedRoute,
              private modalService: NzModalService) {

    if (localStorage.getItem('token') ) {  // 已登录
      this.router.navigate([`/page`]);
    } else if (localStorage.getItem('state') === '401') {
      this.modalService.warning({
        nzTitle: '会话已过期，请重新登录！',
        nzKeyboard: false,  // 是否支持键盘esc关闭
        nzMaskClosable: false, // 点击蒙层是否允许关闭
        nzOnOk: () => {
          this.modalService.closeAll();
          localStorage.removeItem('state');
        }
      });
    }
    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {
    // 设置页面标题
    this.activate.data.subscribe(params => {
      this.titleService.setTitle('用户登录');
    });

  }


  // 登录
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.value.account && this.validateForm.value.password) {
      this.btnLoading = true;

      const $temp = this.loginSevice.login(
        this.validateForm.value.account,
        this.validateForm.value.password
      ).subscribe((data: any) => {
        this.btnLoading = false;
        console.log('token::',data)
        if (data.token) {
          localStorage.setItem('login', 'true');
          localStorage.setItem('sid', data.sid);
          localStorage.setItem('token', data.token);
          localStorage.setItem('account', this.validateForm.value.account);
          this.router.navigate([`/page`]);
        } else {
          this.service.createMessage('error', '账户或密码错误!');
        }
        this.subscribed.push($temp);
      }, (err_msg) => {
        this.btnLoading = false;
        this.service.errorMsg(err_msg);
      });
    }
  }

  // 销毁
  ngOnDestroy(): void {
    this.subscribed.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }


  // 获取用户信息
  getUserInfo() {
    const $temp = this.loginSevice.getUserInfo(
    ).subscribe((data: any) => {
      this.btnLoading = false;
      if (data) {
        // localStorage.setItem('user',JSON.stringify(data.data));
        console.log('user:',data.data);
      }else {
        this.router.navigate([`/login`]);
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.btnLoading = false;
    });
  }


}
