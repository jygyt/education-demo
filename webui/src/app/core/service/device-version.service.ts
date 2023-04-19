import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeviceVersionService {


  constructor(private http: HttpClient) {
  }


  /**
   * 获取最新版本信息
   */
  getVersionInfo(): Observable<any> {
    return this.http.post(`/device-manage/api/manage/version/get-version-info`, {}, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 上传apk和 版本信息
   * @param appVersion
   * @param versionDesc
   * @param file
   */
  addDeviceVersion(appVersion:string, versionDesc:string, file: any) {
    const formData: FormData = new FormData();
    formData.set('appVersion', appVersion);
    formData.set('versionDesc',versionDesc );
    formData.set('file', file);
    return this.http.post(`/device-manage/api/manage/version/add`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * 全部设备更新
   */
  updateDevice(): Observable<any> {
    return this.http.post(`/device-manage/api/manage/version/update`, {}, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }
}

