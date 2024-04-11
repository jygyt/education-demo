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
import {SchoolService} from "../../core/service/school.service";

@Component({
  selector: 'app-self-talk',
  templateUrl: './self-talk.component.html',
  styleUrls: ['./self-talk.component.less']
})
export class SelfTalkComponent implements OnInit {
  listOfData: Array<AccountModel> = [];
  currentArrayOfList = [];

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
        label: '问题',
        value: 'question',
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
        label: '解答',
        value: 'answer',
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


  accountEditForm: FormGroup;

  currentId = null

  constructor(public bigScreenService: BigScreenService,
              private router: Router,
              private service: AllService,
              private schoolService: SchoolService,
              private titleService: Title,
              private loginSevice: LoginService,
              private accountService: AccountService,
              private fb: FormBuilder) {
    this.accountEditForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });


  }

  ngOnInit() {
    this.titleService.setTitle('问题答案管理');
    // if(localStorage.getItem('user')){
    //   this.userData = JSON.parse(localStorage.getItem('user'));
    //   console.log('this.userData1',this.userData);
    // }
    this.getRecommend();
    const _this = this;
    window.addEventListener("resize", function () {
      _this.isFullscreen = _this.bigScreenService.isFullscreen();
    });
    this.setTableScrollWidth();
    this.service.setBreadcrumbState(true);
  }

  // 获取用户信息
  getRecommend() {
    this.tableParams.tableLoading = true;
    this.schoolService.queryListQuestion().subscribe((val) => {
      this.listOfData = val.data
      this.tableParams.total = val.data.size;
      this.tableParams.tableLoading = false;
    })
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
    this.getRecommend()
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


  // 通过查询按钮查询列表
  queryListByBtn() {
    this.getRecommend();
  }




  // 打开编辑操作框
  openEditModal(title: string, data?: any) {
    this.AccountEditModal.IsVisible = true;
    this.AccountEditModal.title = title;
    this.currentId = null;
    this.accountEditForm.reset();
  }

  update(data){
    this.AccountEditModal.IsVisible = true;
    this.AccountEditModal.title = '编辑';
    this.accountEditForm.get('question')!.setValue(data.question);
    this.accountEditForm.get('answer')!.setValue(data.answer);
    this.currentId = data.id;
  }
  // 保存编辑
  saveAccountEdit() {
    for (const key in this.accountEditForm.controls) {
      this.accountEditForm.controls[key].markAsDirty();
      this.accountEditForm.controls[key].updateValueAndValidity();
    }
    this.saveAddAccount();
  }

  // 保存添加
  saveAddAccount() {
    this.AccountEditModal.saveLoading = true;

    this.schoolService.addQuestion(this.currentId, this.accountEditForm.value.question, this.accountEditForm.value.answer).subscribe((val)=>{
      this.AccountEditModal.saveLoading = false;
      this.AccountEditModal.IsVisible = false;
      this.getRecommend()
    })
  }



// 删除账号
  confirmDelete(id: string) {
    this.tableParams.tableLoading = true;
    this.schoolService.deleteQuestionId(id).subscribe((val)=>{
      this.tableParams.tableLoading = false;
      this.getRecommend();
    })
  }
}
