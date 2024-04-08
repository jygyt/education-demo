import { Component, OnInit } from '@angular/core';
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {SchoolService} from "../../core/service/school.service";
import {Observable, Observer} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.less']
})
export class SchoolDetailComponent implements OnInit {
  typeName = null;
  listOfData: Array<any> = [];

  tableParams = {
    tableLoading: false,
    tableScrollWidth: '0px',
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    size: 'default'
  }

  templateModal = {
    id: null,
    isVisible : false,
    title: '',
    isLoading: false,
    schoolName: null,
    schoolPhone: null,
    picBase64: '',
    schoolDescribe: null,
    displayIndex: 1
  }

  noticeContentModal={
    isVisible: false,
    noticeContent:''
  }
  schoolDescribe = ''

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(private service: SchoolService, private messageService: NzMessageService,private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.queryListForPage();
  }

  queryListForPage() {
    this.service.queryListSchool().subscribe((res: any) => {
      this.listOfData = res.data
      this.tableParams.total = res.data.size;

      this.listOfData.forEach(x=>{
        x['showContent'] = this.sanitizer.bypassSecurityTrustHtml(x.noticeContent);
      })
    }, (errMsg) => {

    });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  beforeUpload = (file: File) => {
    this.getBase64(file, (img) => {
      this.fileList = [{
        uid: -1,
        name: file.name,
        status: 'done',
        thumbUrl: img
      }];

      this.templateModal.picBase64 = img.split('data:image/jpeg;base64,')[1];
      // this.images_add = [{
      //   base64: img,
      //   filename: file.name,
      // }];
    });
    return false;  // 这里给false  就不会发送nzAction上传
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


  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  update(data) {
    this.templateModal = {
      id: data.id,
      isVisible : false,
      title: '编辑界面',
      isLoading: false,
      schoolName: data.schoolName,
      schoolPhone: data.schoolPhone,
      picBase64: data.picBase64,
      schoolDescribe: data.schoolDescribe,
      displayIndex: data.displayIndex
    };
    this.fileList = [{
      uid: -1,
      name: '',
      status: 'done',
      thumbUrl: 'data:image/jpeg;base64,' + this.formatString(data.picBase64)
    }];
    this.templateModal.isVisible = true;
  }

  handleOk() {

  }

  delete(id){
    this.service.deleteById(id).subscribe((val)=>{
      this.queryListForPage()
    })
  }

  addTemplate() {
    this.templateModal = {
      id: null,
      isVisible : false,
      title: '新增界面',
      isLoading: false,
      schoolName: null,
      schoolPhone: null,
      picBase64: '',
      schoolDescribe: null,
      displayIndex: 1
    };
    this.fileList = []
    this.templateModal.isVisible = true;
  }

  updateTemplate(data) {
  }

  deleteTemplate(id) {
  }

  handleOkTemplate() {
    this.service.addSchool(this.templateModal.id,this.templateModal.schoolName,this.templateModal.schoolPhone,this.templateModal.displayIndex,this.templateModal.schoolDescribe,this.templateModal.picBase64).subscribe((val) => {
      this.templateModal.isVisible = false;
      this.queryListForPage()
    })
  }

  opendNoticeContent(noticeContent: any) {
    this.noticeContentModal.isVisible = true;
    this.noticeContentModal.noticeContent = noticeContent;
  }
}
