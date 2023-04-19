import {DeviceModel} from "./device.model";
import {SafeResourceUrl} from "@angular/platform-browser";

export class RecordModel {
  id: string = null; //"10",
  userNumber:  string = null;
  name: string = null;
  temp: string = null;
  faceImageBase64: string = null;
  gmtCreate: number = null;
  gmtModified: number= null;
  device: DeviceModel = null;
  faceImgUrl: SafeResourceUrl = null;
  tempFloat: number = null;
  statusFace: number = null;
}

