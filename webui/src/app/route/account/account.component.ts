import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountModel} from "../../core/model/account.model";
import {BigScreenService} from "angular-bigscreen";
import {ActivatedRoute, Router} from "@angular/router";
import {AllService} from "../../core/service/all.service";
import {Title} from "@angular/platform-browser";
import {AccountService} from "../../core/service/account.service";
import {SortablejsOptions} from "ngx-sortablejs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../core/service/login.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

  subscribed: Array<Subscription> = [];

  userData: any = {};
  userId: string = null;
  // 职位列表数据[单独定义一个类]
  listOfData: Array<AccountModel> = [];

  accountMOdel: AccountModel = new AccountModel();
  // 全部职业信息列表的备份
  oldArrayOfList = [];
  // 当前职业信息列表的备份
  currentArrayOfList = [];

  // 当前页数据条数
  num: number;

  id: string = '';
  level: number = null;

  // 表格相关参数
  tableParams = {
    pageSize: 20,
    pageIndex: 1,
    total: 0,
    size: 'default',
    tableLoading: false,
    tableScrollWidth: '65px' // table的滚动宽度
  };

  // 新增操作框
  AccountEditModal = {
    title: '',
    IsVisible: false,
    saveLoading: false,
  };

  // 编辑“行业”操作框
  EditModal = {
    title: '',
    IsVisible: false,
    saveLoading: false,
  };

  resetPwdModal = {
    title: '',
    IsVisible: false,
    saveLoading: false,
  }

  type: number = null;
  // 筛选条件项
  screenBoxItem = {
    account: null, // 账号
    level: null // 权限
  };

  // 密度数据
  columHeightList = [
    {
      label: '默认',
      value: 'default',
      selected: true
    },
    {
      label: '中等',
      value: 'middle',
      selected: false
    },
    {
      label: '紧凑',
      value: 'small',
      selected: false
    }
  ];

  // 表格列参数
  columnParams = {
    columnShow: true,
    Indeterminate: false,
    data: [
      {
        label: '账号',
        value: 'account',
        status: true, // 是否显示
        width: 120,
        showSort: false,
        showFilter: false,
        fixedLeft: false,
        fixedRight: false,
        order: 0,
        distance: null // 固定列的距离
      },
      {
        label: '权限',
        value: 'level',
        status: true, // 是否显示
        width: 120,
        showSort: false,
        showFilter: false,
        fixedLeft: false,
        fixedRight: false,
        order: 0,
        distance: null // 固定列的距离
      },
      {
        label: '创建人',
        value: 'createdAuthAccount',
        status: true, // 是否显示
        width: 120,
        showSort: false,
        showFilter: false,
        fixedLeft: false,
        fixedRight: false,
        order: 0,
        distance: null // 固定列的距离
      },
      {
        label: '创建时间',
        value: 'gmtCreate',
        status: true, // 是否显示
        width: 120,
        showSort: true,
        showFilter: false,
        fixedLeft: false,
        fixedRight: false,
        order: 0,
        distance: null // 固定列的距离
      },
      {
        label: '操作',
        value: 'opt',
        status: true, // 是否显示
        width: 160,
        showSort: false,
        showFilter: false,
        fixedLeft: false,
        fixedRight: true,
        order: 0,
        distance: '0' // 固定列的距离
      }
    ],
    hasFixedLeft: false,
    hasFixedRight: false
  };

  // 是否全屏状态
  isFullscreen = false;


  // 列数据拷贝——调整列排序使用
  columnOldStr: string = '';

  // 列数据拷贝——重置列使用
  columnOldStr2: string = '';

  // 排序方式
  sortType = null;// 'descend' | 'ascend' | null

  // 是否查看详情
  isViewDetail: boolean = false;
  count: number = null;

  // 招聘信息操作框
  InfoEditModal = {
    IsVisible: false,
    saveLoading: false
  };


  accountEditForm: FormGroup;

  EditForm: FormGroup;

  resetPwdForm: FormGroup;

  constructor(public bigScreenService: BigScreenService,
              private router: Router,
              private service: AllService,
              private titleService: Title,
              private loginSevice: LoginService,
              private accountService: AccountService,
              private fb: FormBuilder,) {
    this.accountEditForm = this.fb.group({
      account: [null, [Validators.required]],
      level: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [this.confirmationValidator]]
    });
    this.EditForm = this.fb.group({
      account: [null, [Validators.required]],
      level: [null, [Validators.required]],
    });

    this.resetPwdForm = this.fb.group({
      resetPwd: [null, [Validators.required]],
      account: [null]
    })


  }

  ngOnInit() {
    this.titleService.setTitle('设备管理');
    // if(localStorage.getItem('user')){
    //   this.userData = JSON.parse(localStorage.getItem('user'));
    //   console.log('this.userData1',this.userData);
    // }
    this.getUserInfo();

    this.level = 1;
    const _this = this;
    window.addEventListener("resize", function () {
      _this.isFullscreen = _this.bigScreenService.isFullscreen();
    });
    this.setTableScrollWidth();
    // this.queryPositionData();
    this.service.setBreadcrumbState(true);
    // this.queryListAccount();
  }

  // 获取用户信息
  getUserInfo() {
    const $temp = this.loginSevice.getUserInfo(
    ).subscribe((data: any) => {
      this.tableParams.tableLoading = true;
      if (data) {
        localStorage.setItem('user',JSON.stringify(data.data));
        this.userData = data.data;
        this.queryListAccount();
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.tableParams.tableLoading = false;
    });
  }

  // 密度——设置表格size
  setColumHeight(size, i) {
    this.tableParams.size = size;
    this.columHeightList.forEach((value, index) => {
      value.selected = i === index ? true : false;
    })
  }

  // 设置全屏
  setFullscreen() {
    // this.bigScreenService.request(this.sectionTable.nativeElement);
    const el = document.documentElement; // 将全部元素全屏，再通过样式主要展示表格区，解决弹出式下拉菜单不显示的问题
    const rfs = el['requestFullScreen'] || el['webkitRequestFullScreen'] || el['mozRequestFullScreen'] || el['msRequestFullscreen'];
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
      this.isFullscreen = true; // 多设置一个属性，解决部分版本浏览器退出全屏后卡顿的bug
    }
    return;
  }

  // 退出全屏
  setExitsFullscreen() {
    this.isFullscreen = false;
    this.bigScreenService.exit();
    // 全屏组件：https://www.npmjs.com/package/angular-bigscreen
  }

  // 设置刷新
  setReload() {
    this.queryListAccount()
  }

  // 列设置拖动配置
  setTableOptions: SortablejsOptions = {
    group: 'set-table-group',
    filter: ".ignore-elements",
    onUpdate: ($event) => {
      this.sortColumn($event, $event.item);
    }
  };

  // 设置表格滚动宽度
  setTableScrollWidth() {
    this.tableParams.tableScrollWidth = '0px';
    let tableWidth = 0;
    this.columnParams.data.forEach((item) => {
      tableWidth = tableWidth + item.width;
    });
    this.tableParams.tableScrollWidth = tableWidth + 'px';

    this.columnOldStr = JSON.stringify(this.columnParams.data);
    this.columnOldStr2 = JSON.stringify(this.columnParams.data);
  }

  // 列展示
  checkedColumn($event) {
    this.columnParams.data.forEach((item) => {
      item.status = $event;
    });
    this.refreshColumnShow();
  }

  // 刷新列展示状态
  refreshColumnShow() {
    this.columnParams.columnShow = this.columnParams.data.every((item) => {
      return item.status
    });
    this.columnParams.Indeterminate = this.columnParams.data.some((item) => {
      return item.status && !this.columnParams.columnShow
    });
    this.columnParams.hasFixedLeft = this.columnParams.data.some((value) => {
      return value.fixedLeft;
    });
    this.columnParams.hasFixedRight = this.columnParams.data.some((value) => {
      return value.fixedRight;
    });
    this.columnOldStr = JSON.stringify(this.columnParams.data);
  }

  // 重置列展示状态
  resetColumnShow() {
    this.columnParams.data = [];
    this.columnParams.data = JSON.parse(this.columnOldStr2);
    this.refreshColumnShow();
  }

  // 排序
  sortChange($event, name) {
    this.sortType = $event;
    if ($event === 'ascend') {
      const newArray = this.listOfData.sort(this.service.sortBy(name, true));
      this.listOfData = [];
      this.listOfData = [...newArray];
    } else if ($event === 'descend') {
      const newArray = this.listOfData.sort(this.service.sortBy(name, false));
      this.listOfData = [];
      this.listOfData = [...newArray];
    } else { // null
      this.listOfData = [];
      this.listOfData = [...this.currentArrayOfList];
    }
  }


  // 固定列
  fixedColumn(item, type) {
    this.columnParams.data.forEach((value) => {
      if (value.value === item.value) {
        value.fixedLeft = type === 'left' ? true : false;
        value.fixedRight = type === 'left' ? false : true;
      }
    });
    this.columnParams.hasFixedLeft = this.columnParams.data.some((value) => {
      return value.fixedLeft;
    });
    this.columnParams.hasFixedRight = this.columnParams.data.some((value) => {
      return value.fixedRight;
    });
    this.calculatedDistance();
  }

  // 固定列后计算列距离边框的距离
  calculatedDistance() {
    console.log('固定列后计算列距离边框的距离');
    let fixedLeftNum = 0;
    let fixedRightNum = 0;
    const reverseArray = JSON.parse(JSON.stringify(this.columnParams.data));
    let leftLength = 0; //todo
    let rightLength = 0;
    this.columnParams.data.forEach((value) => {
      if (value.fixedLeft) {
        fixedLeftNum++;
        value.order = fixedLeftNum - 1;
        leftLength = leftLength + value.width;
        value.distance = leftLength - value.width + 'px';
      }
    });
    reverseArray.reverse();
    reverseArray.forEach((value) => {
      if (value.fixedRight) { //todo
        fixedRightNum++;
        switch (fixedRightNum) {
          case 1:
            value.order = 4;
            break;
          case 2:
            value.order = 3;
            break;
          case 3:
            value.order = 2;
            break;
          case 4:
            value.order = 1;
            break;
          case 5:
            value.order = 0;
            break;
        }
        rightLength = rightLength + value.width;
        value.distance = rightLength - value.width + 'px';

        this.columnParams.data.forEach((item) => {
          if (item.fixedRight && item.value === value.value) {
            item.distance = value.distance;
            item.order = value.order;
          }
        })
      }
    });

    this.columnOldStr = JSON.stringify(this.columnParams.data);
  }

  // 取消固定列
  cancelFixedColumn(item) {
    this.columnParams.data.forEach((value) => {
      if (value.value === item.value) {
        value.fixedLeft = false;
        value.fixedRight = false;
        value.distance = null;
      }
    });
    this.columnParams.hasFixedLeft = this.columnParams.data.some((value) => {
      return value.fixedLeft;
    });
    this.columnParams.hasFixedRight = this.columnParams.data.some((value) => {
      return value.fixedRight;
    });
    this.calculatedDistance();
  }

  // 表格列重新排序
  sortColumn($event, item) {
    const columnName = item.getElementsByTagName("em")[0].innerHTML;
    const oldStr = JSON.parse(this.columnOldStr);
    oldStr.forEach((value, index) => {
      if (value.label === columnName) {
        if ($event.oldIndex < $event.newIndex) { // 向下拖动
          value.order = $event.newIndex - 1;
        } else { // 向上拖动
          value.order = $event.newIndex - 3;
        }
      }
    });
    this.columnParams.data = [];
    this.columnParams.data = [...oldStr.sort(this.service.compare('order'))];

    this.columnParams.data.forEach((val, index) => {
      val.order = index;
    });
    this.calculatedDistance();
    this.columnOldStr = JSON.stringify(this.columnParams.data);
  }


  // 表格分页查询-页码改变的回调
  PageIndexChange($event) {
    this.tableParams.pageIndex = $event;
    this.queryListAccount();
  }

  //  表格分页查询-每页条数改变的回调
  PageSizeChange($event) {
    this.tableParams.pageIndex = 1;
    this.tableParams.pageSize = $event;
    this.queryListAccount();
  }

  // 通过查询按钮查询列表
  queryListByBtn() {
    this.tableParams.pageIndex = 1;
    this.tableParams.pageSize = 20;
    this.queryListAccount();
  }


  //表格分页查询-删除
  PageSizeChange1() {
    this.num = this.tableParams.total - (this.tableParams.pageIndex - 1) * this.tableParams.pageSize;
    if (this.num === 1 && this.tableParams.total != 1) {
      this.tableParams.pageIndex = this.tableParams.pageIndex - 1;
    }
    this.queryListAccount();
  }

  //表格分页查询-修改
  PageSizeChange2() {
    this.num = this.tableParams.total - (this.tableParams.pageIndex - 1) * this.tableParams.pageSize;
    this.queryListAccount();
  }

  // 重置查询条件
  resetScreenBoxItem() {
    this.screenBoxItem.account = null;
    this.screenBoxItem.level = null;
    this.queryListByBtn();
  }

  // 列表分页查询
  queryListAccount() {
    this.listOfData = [];
    this.tableParams.tableLoading = true;
    const $temp = this.accountService.selectAccount(this.screenBoxItem.account,
      this.screenBoxItem.level,
      this.tableParams.pageIndex,
      this.tableParams.pageSize
    ).subscribe((data: any) => {
      this.tableParams.tableLoading = false;
      if (data) {
        this.listOfData = data.data.list;
        this.oldArrayOfList = JSON.parse(JSON.stringify(data.data.list));
        this.currentArrayOfList = JSON.parse(JSON.stringify(data.data.list));
        this.tableParams.total = data.data.total;
      }
      this.subscribed.push($temp);
    }, () => {
      this.tableParams.tableLoading = false;
    });
  }


  // 确认密码
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value != this.accountEditForm.value.password) {
      return {confirm: true, error: true};
    }
    return {};
  }

  // 验证密码
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.accountEditForm.controls.password2.updateValueAndValidity());
    this.accountEditForm.updateValueAndValidity();
    this.accountEditForm.enable();
  }


  // 打开编辑操作框
  openEditModal(title: string, data?: any) {
    this.type = null;
    this.AccountEditModal.IsVisible = true;
    this.AccountEditModal.title = title;
    this.type = 0;
    this.id = null;
    this.accountEditForm.reset();
    this.accountEditForm.get('level')!.setValue('1');
  }

  // 保存编辑
  saveAccountEdit() {
    for (const key in this.accountEditForm.controls) {
      this.accountEditForm.controls[key].markAsDirty();
      this.accountEditForm.controls[key].updateValueAndValidity();
    }
    this.level = parseInt(this.accountEditForm.value.level);
    this.saveAddAccount();

  }

  // 保存添加
  saveAddAccount() {
    this.AccountEditModal.saveLoading = true;
    const $temp = this.accountService.addAccount(
      this.accountEditForm.value.account,
      this.accountEditForm.value.password,
      this.type,
      this.level,
      this.userData.id).subscribe((data: any) => {
      this.AccountEditModal.saveLoading = false;
      if (data.message.indexOf('成功') != -1) {
        this.AccountEditModal.IsVisible = false;
        this.service.createMessage('success', '操作成功！');
        this.PageSizeChange2();
      } else {
        this.service.createMessage('error', data.message);
      }
      this.subscribed.push($temp);

    }, (err_msg) => {
      this.AccountEditModal.saveLoading = false;
      this.service.errorMsg(err_msg);
    });
  }


  EditAccount(data: any) {
    this.EditModal.title = '编辑' + data.account + '账号';
    this.EditModal.IsVisible = true;
    this.type = 1;
    this.id = data.id
    this.accountMOdel = null;
    this.accountMOdel = data;
    this.EditForm.get('account')!.setValue(data.account);
    this.EditForm.get('level')!.setValue(data.level.toString());
  }

// 保存信息编辑
  editAccount() {
    for (const key in this.EditForm.controls) {
      this.EditForm.controls[key].markAsDirty();
      this.EditForm.controls[key].updateValueAndValidity();
    }
    this.level = parseInt(this.EditForm.value.level);

    this.EditModal.saveLoading = true;
    const $temp = this.accountService.editAccount(
      this.id,
      this.EditForm.value.account,
      this.accountMOdel.password,
      this.type,
      this.level,
      this.userData.id).subscribe((data: any) => {
      this.EditModal.saveLoading = false;
      if (data.message.indexOf('成功') != -1) {
        this.EditModal.IsVisible = false;
        this.service.createMessage('success', '操作成功！');
        this.PageSizeChange2();
      } else {
        this.service.createMessage('error', '操作失败！');
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.EditModal.saveLoading = false;
      this.service.errorMsg(err_msg);
    });
  }

// 打开密码操作框
  openResetPwd(account: string) {
    this.resetPwdModal.title = account;
    this.resetPwdModal.IsVisible = true;
    this.resetPwdForm.get('account')!.setValue(account);
    this.resetPwdForm.get('resetPwd')!.setValue('111111');
  }

  // 重置密码
  resetPassword() {
    for (const key in this.resetPwdForm.controls) {
      this.resetPwdForm.controls[key].markAsDirty();
      this.resetPwdForm.controls[key].updateValueAndValidity();
    }
    this.resetPwdModal.saveLoading = true;
    const $temp = this.accountService.resetPwd(this.resetPwdForm.value.account,
      this.resetPwdForm.value.resetPwd
    ).subscribe((data: any) => {
      this.resetPwdModal.saveLoading = false;
      console.log()
      if (data.message.indexOf('成功') != -1) {
        this.resetPwdModal.IsVisible = false;
        this.service.createMessage("success", "密码重置成功")
      } else {
        this.service.createMessage("error", "密码重置失败")
      }
      this.subscribed.push($temp);
    }, (err_msg) => {

    });
    this.resetPwdModal.saveLoading = false;
  }

// 删除账号
  confirmDelete(id: string) {
    this.tableParams.tableLoading = true;
    const $temp = this.accountService.delAccount(id).subscribe((data: any) => {
      this.tableParams.tableLoading = false;
      if (data.message.indexOf('成功') != -1) {
        this.service.createMessage('success', '删除成功！');
        this.PageSizeChange1();
      } else {
        this.service.createMessage('error', '删除失败！');
      }
      this.subscribed.push($temp);
    }, (err_msg) => {
      this.tableParams.tableLoading = false;
      this.service.errorMsg(err_msg);
    });
  }
}
