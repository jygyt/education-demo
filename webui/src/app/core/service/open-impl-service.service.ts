import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OpenImplServiceService {

  constructor(private http: HttpClient) { }


  /**
   * 删除开放接口
   * @param urlId
   */
  delOpenImpl(urlId: string): Observable<any> {
    return this.http.post(`/device-manage/api/open/token/delete`, {
      'urlId': urlId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 查询开放接口列表
   * @param implNameKey
   */
  queryUrlToken(implNameKey: string): Observable<any> {
    return this.http.post(`/device-manage/api/open/token/get-all`, {
      'implNameKey': implNameKey
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 添加开放接口
   * @param implParam
   * @param implUrl
   * @param implName
   * @param domain
   */
  addOpenImpl(implParam: string,implUrl:string, implName:string,domain: string): Observable<any> {
    return this.http.post(`/device-manage/api/open/token/add`, {
      'implParam': implParam,
      'implUrl':implUrl,
      'implName': implName,
      'domain': domain
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 修改开放接口
   * @param urlId
   * @param implParam
   * @param implUrl
   * @param implName
   * @param domain
   */
  updateOpenImpl(urlId:string,implParam: string,implUrl:string, implName:string,domain: string): Observable<any> {
    return this.http.post(`/device-manage/api/open/token/update`, {
      'urlId':urlId ,
      'implParam': implParam,
      'implUrl':implUrl,
      'implName': implName,
      'domain': domain
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

}
