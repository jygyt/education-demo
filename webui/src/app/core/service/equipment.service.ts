import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) {

  }

  /**
   * 设备类型信息
   * @param deviceType 类型
   * @param brand 厂商
   * @param model 型号
   * @param driverVersion 版本
   */
  getDeviceDriver(): Observable<any> {
    return this.http.post(`/v1/driver/all-support-driver`,{},YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备管理——查询列表
   * @param deviceId 设备ID
   * @param deviceName 设备名称
   * @param identity 设备标识
   * @param params 设备参数
   */
  getDeviceInfoList(): Observable<any> {
    return this.http.post(`/v1/driver/device-info-list`,{},YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备管理——添加设备
   * @param deviceName 名称
   * @param descriptions 描述
   * @param identity 设备标识
   * @param params 设备参数{key:value,key:value}
   */
  getSaveDevice(deviceName: string, descriptions: string, identity: string, params: any): Observable<any> {
    return this.http.post(`/v1/driver/save-device`, {
      deviceName,
      descriptions,
      identity,
      params
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备管理——修改设备
   * @param deviceId 设备ID
   * @param deviceName 设备名称
   * @param descriptions 描述
   * @param identity 设备标识
   * @param params 设备参数
   */
  getChangeDevice(deviceId: string, deviceName: string, descriptions: string, identity: string, params: any): Observable<any> {
    return this.http.post(`/v1/driver/change-device`, {
      deviceId,
      deviceName,
      descriptions,
      identity,
      params
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备管理——删除设备
   * @param deviceId 设备ID
   */
  getRemoveDevice(deviceId: string): Observable<any> {
    return this.http.post(`/v1/driver/remove-device`,{
      deviceId
    },YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备类型树
   */
  getTreeDriverTree(): Observable<any> {
    return this.http.post(`/v1/driver/tree-support-driver`,{
    },YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  playCamera(identity: string,params: string): Observable<any> {
    return this.http.post(`/v1/video/play`,{
      identity,
      params
    },YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  seekCamera(identity,params){
    return this.http.post(`/v1/video/getCameraSeek`, {
        identity,
        params,
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getVideoList(){
    return this.http.post(`/v1/video/getVideoList`, {
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  playVideo(stream,app,type,mediaServerId){
    return this.http.post(`/v1/video/play/video`, {
        stream,
        app,
        type,
        mediaServerId
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  playSeek(stream,type,command,horizonSpeed,verticalSpeed,zoomSpeed){
    return this.http.post(`/v1/video/play/seek`, {
        stream,
        type,
        command,
        horizonSpeed,
        verticalSpeed,
        zoomSpeed
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getRecord(app,stream,period){
    return this.http.post(`/v1/video/getRecord`, {
        app,
      stream,
      period
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  startRecord(app,stream,type,customized_path,mediaServerId){
    return this.http.post(`/v1/video/start/record`, {
        app,
        stream,
      type,
        customized_path,
        mediaServerId
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  stopRecord(app,stream){
    return this.http.post(`/v1/video/stop/record`, {
        app,
        stream
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  downLoad(path,name){
    window.location.href = `/v1/video/record/download?fileName=${name}&filePath=${path}`
  }

}
