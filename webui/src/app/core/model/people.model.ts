import {SafeResourceUrl} from "@angular/platform-browser";

export class PeopleModel {
  id: string = null;
  userNumber:string = null; //"学号/教工号",
  name:string = null;//"张三",
  sex: number = null; //"0男，1女",
  age: number = null; //"23",
  idcard: string = null; //""，
  mobile: string = null;
  createAuthId: string = null; //"创建人",
  faceImageBase64:string = null; //"人脸照片",
  gmtCreate: number = null;
  gmtModified: number = null;
  createAuthAccount: string = null;
  checked: boolean = false; // 是否被选中
  faceImgUrl: SafeResourceUrl = null;
  imgType: string = null; // 图片格式

  typeUser:number =  null;
  statusFace:number = null;
  statusSynchro:number = null;
  isDay: number = null; //是否是走读生  1:是 0:否
}
