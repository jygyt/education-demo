import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {YunzaiHeaders} from '../headers/http.header';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable()
export class AllService {

  breadcrumbShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,
              private message: NzMessageService,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) {
    this.getBreadcrumbState();
  }

  setBreadcrumbState(breadcrumb: boolean) {
    this.breadcrumbShow.next(breadcrumb);
  }

  getBreadcrumbState(): Observable<boolean> {
    return this.breadcrumbShow.asObservable();
  }


  /**
   * 格式化时间
   * @param nowData
   * @param type
   */
  traData(nowData, type) {
    const myData = new Date(nowData);
    const year = myData.getFullYear();
    const month = myData.getMonth() + 1;
    const day = myData.getDate();
    const hours = myData.getHours();
    const minutes = myData.getMinutes();
    const seconds = myData.getSeconds();

    let nowMonth;
    if (month < 10) {
      nowMonth = '0' + month;
    } else {
      nowMonth = month;
    }

    let nowDay;
    if (day < 10) {
      nowDay = '0' + day;
    } else {
      nowDay = day;
    }

    let nowHours;
    if (hours < 10) {
      nowHours = '0' + hours;
    } else {
      nowHours = hours;
    }

    let nowMinutes;
    if (minutes < 10) {
      nowMinutes = '0' + minutes;
    } else {
      nowMinutes = minutes;
    }

    let nowSeconds;
    if (seconds < 10) {
      nowSeconds = '0' + seconds;
    } else {
      nowSeconds = seconds;
    }

    if (type === 1) {
      return `${year}-${nowMonth}-${nowDay} ${nowHours}:${nowMinutes}:${nowSeconds}`;
    } else if (type === 2) {
      return `${year}-${nowMonth}-${nowDay}`;
    } else if (type === 3) {
      return `${nowMonth}.${nowDay}`;
    } else if (type === 4) {
      return `${year}-${nowMonth}-${nowDay} ${nowHours}:${nowMinutes}`;
    } else if (type === 5) {
      return `${year}年${nowMonth}月${nowDay}日 ${nowHours}:${nowMinutes}`;
    } else if (type === 6) {
      return `${year}-${nowMonth}`;
    }
  }


  /**
   * 带有图标的通知提醒框
   * @param {string} type:success || info || warning || error
   * @param {string} title
   * @param {string} msg
   */
  createNotification(type: string, title: string, msg?: string): void {
    this.notification.create(type, title, msg ? msg : '');
  }

  /**
   *  全局提示
   * @param {string} type:success|| error || warning
   * @param {string} msg
   */
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }


  // 按照某一字段排序
  compare(property) {
    return function(a, b) {
      const value1 = a[property];
      const value2 = b[property];
      return value1 - value2;
    };
  }


  /**
   * 排序方法
   * @param attr 排序字段
   * @param rev true:升序；false:降序
   * @returns {(a, b) => number}
   */
  sortBy(attr, rev) {
    rev = (rev) ? 1 : -1;
    return function(a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    };
  }



  /**
   * 接口报错后的提示
   * @param error
   * @param {string} msg 可选参数：提示信息
   */
  errorMsg(error: any, msg?: string) {
    switch (error.status) {
      case 401:
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        localStorage.setItem('state', '401');
        this.router.navigate([`/login`]);
        // this.modalService.warning({
        //   nzTitle: '会话已过期，请重新登录！',
        //   nzKeyboard: true,  // 是否支持键盘esc关闭
        //   nzMaskClosable: true, // 点击蒙层是否允许关闭
        //   nzMaskStyle: {
        //     backgroundColor: 'rgba(0,0,0,.3)'
        //   },
        //   nzOnOk: () => {
        //     this.modalService.closeAll();
        //   }
        // });
        break;
      case 500:
        if (error.error.message) {
          this.createMessage('error', error.error.message);
        } else if (error.error.msg) {
          this.createMessage('error', error.error.msg);
        } else if (msg) {
          this.createMessage('error', msg);
        } else {
          this.createMessage('error', `服务器请求错误！(${error.status})`);
        }
        break;
      default:
        if (msg != null) {
          this.createMessage('error', msg);
        } else {
          this.createMessage('error', `服务器请求错误！(${error.status})`);
        }
    }
  }

  //  秒数转化为时分秒
  formatSeconds(value) {
    //  秒
    let second = parseInt(value)
    //  分
    let minute = 0
    //  小时
    let hour = 0
    //  天
    //  let day = 0
    //  如果秒数大于60，将秒数转换成整数
    if (second > 60) {
      //  获取分钟，除以60取整数，得到整数分钟
      minute = parseInt((second/60).toString())
      //  获取秒数，秒数取佘，得到整数秒数
      second = parseInt((second % 60).toString())
      //  如果分钟大于60，将分钟转换成小时
      if (minute > 60) {
        //  获取小时，获取分钟除以60，得到整数小时
        hour = parseInt((minute / 60).toString())
        //  获取小时后取佘的分，获取分钟除以60取佘的分
        minute = parseInt((minute % 60).toString())
        //  如果小时大于24，将小时转换成天
        //  if (hour > 23) {
        //    //  获取天数，获取小时除以24，得到整天数
        //    day = parseInt(hour / 24)
        //    //  获取天数后取余的小时，获取小时除以24取余的小时
        //    hour = parseInt(hour % 24)
        //  }
      }
    }

    let result = '' + parseInt(second.toString()) + 's'
    if (minute > 0) {
      result = '' + parseInt(minute.toString()) + 'm' + result
    }
    if (hour > 0) {
      result = '' + parseInt(hour.toString()) + 'h' + result
    }
    //  if (day > 0) {
    //    result = '' + parseInt(day) + '天' + result
    //  }
    return result
  }

  //  秒数转化为时分秒
  formatKbs(value) {
    //  b
    let second = parseInt(value)
    //  kb
    let minute = 0
    //  mb
    let hour = 0
    //  天
    //  let day = 0
    //  如果秒数大于60，将秒数转换成整数
    if (second > 1024) {
      //  获取分钟，除以60取整数，得到整数分钟
      minute = Math.round((second/1024)*Math.pow(10,2))/Math.pow(10,2);
      //  如果分钟大于60，将分钟转换成小时
      if (minute > 1024) {
        //  获取小时，获取分钟除以60，得到整数小时
        hour = Math.round((minute/1024)*Math.pow(10,2))/Math.pow(10,2);
      }
    }

    if (hour > 0) {
      const result = '' + parseInt(hour.toString()) + 'Mb'
      return result
    }
    if (minute > 0) {
      const result = '' + parseInt(minute.toString()) + 'Kb'
      return result
    }
  }

}

