export class DeviceModel {
  id: string = null;
  deviceNumber: string = null; //"设备编号/序列号",
  name: string = null; // "教学楼" ,
  createAuthId: string = null;//"创建人",
  location: string = null; //"101会议室",
  deviceStatus: number = null; //"设备状态：0离线，1在线"，
  tempStatus: number = null; //"体温模块开关：0关，1开"，
  gmtCreate: number = null; //"",
  gmtModified: number = null;
  checked: boolean = false;
  online: number = null;
  createAuthAccount: string = null;
  appVersion: string = null; // 设备版本号
  deviceName: string = null;
}



