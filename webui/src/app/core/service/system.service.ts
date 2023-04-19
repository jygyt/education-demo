import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }


  /**
   * 系统信息查询
   * @param systemName
   */
  queryListSystem(systemName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/select-system`, {
      'systemName': systemName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 根据系统查询接口
   * @param systemId
   */
  queryImplBySystem(systemId: string) : Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/select-impl`, {
      'systemId': systemId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 系统添加
   * @param systemName
   */
  addSystem(systemName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/add-system`, {
      'systemName': systemName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 系统修改
   * @param systemId
   * @param systemName
   */
  updateSystem(systemId: string, systemName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/update-system`, {
      "id":systemId,
      'systemName': systemName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 系统删除
   * @param systemId
   */
  deleteSystem(systemId: string) : Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/delete-system`, {
      "systemIds":systemId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 接口添加
   * @param implName
   * @param implType
   * @param url
   * @param implDescribe
   * @param systemId
   */
  addImpl(implName: string,implType: string,url:string,implDescribe:string,systemId:string) : Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/add-impl`, {
      "implName": implName,
      "implType": implType,
      "url": url,
      "implDescribe": implDescribe,
      "systemId":systemId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 修改接口
   * @param implName
   * @param implType
   * @param url
   * @param implDescribe
   * @param id
   */
  updateImpl(implName: string,implType: string,url:string,implDescribe:string,id:string) : Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/update-impl`, {
      "implName": implName,
      "implType": implType,
      "url": url,
      "implDescribe": implDescribe,
      "id":id
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 接口删除
   * @param implId
   */
  deleteImpl(implId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/open/delete-impl`, {
      "implIds":implId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 分页查询日志信息
   * @param page
   * @param size
   */
  queryLogByPage(page: number,size: number) : Observable<any> {
    return this.http.post(`/device-manage/api/manage/log/list-by-page`, {
      "page":page,
      "size":size
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }
}



