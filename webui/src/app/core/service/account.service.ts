import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {

  }

  /**
   * 重置密码
   * @param account
   * @param password
   */
  resetPwd(account: string, password: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/resetpwd`, {
      'account': account,
      'password': password
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 账号列表
   * @param page
   * @param size
   */
  getAuthList(page: number,size: number): Observable<any>{
    return this.http.patch(`/device-manage/api/manage/auth/list`, {
      'page': page,
      'size': size
    },YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 新增 / 编辑 账号
   * @param id
   * @param account
   * @param password
   * @param type 0新增，1编辑
   * @param level 1管理员，2普通用户
   * @param name
   * @param createAuthId
   * @param lock 1锁定，0未锁定
   * @param statusAuth 是否删除 (0否，1是)
   */
  editAccount(id: string,account: string, password: string, type: number, level: number, createAuthId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/add`, {
      'id': id,
      'account': account,
      'password': password,
      'type': type,
      'level': level,
      'createAuthId': createAuthId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 新增 / 编辑 账号
   * @param id
   * @param account
   * @param password
   * @param type 0新增，1编辑
   * @param level 1管理员，2普通用户
   * @param name
   * @param createAuthId
   * @param lock 1锁定，0未锁定
   * @param statusAuth 是否删除 (0否，1是)
   */
  addAccount(account: string, password: string, type: number, level: number, createAuthId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/add`, {
      'account': account,
      'password': password,
      'type': type,
      'level': level,
      'createAuthId': createAuthId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }
  /**
   * 删除账号
   * @param ids,以逗号分割
   */
  delAccount(ids: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/delete`, {
      'ids': ids
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 账号查询
   * @param account
   * @param level
   */
  selectAccount(account: string, level: number, page: number, size: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/search`, {
      'account': account,
      'level': level,
      'page': page,
      'size':size
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 锁定账号
   * @param userId
   * @param lock
   */
  lockAccount(userId: string, lock: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/auth/lock`, {
      'userId': userId,
      'lock': lock
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


}
