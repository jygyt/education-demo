import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SumRecordService {

  constructor(private http: HttpClient) {

  }


  /**
   * 根据设备分页查询统计记录
   * @param page
   * @param size
   * @param deviceId
   */
  getSumRecord(page: number, size: number,deviceId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/sum/get-record`, {
      'page': page,
      'size': size,
      'deviceId': deviceId,
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 根据统计记录 分页查询失败人员信息
   * @param page
   * @param size
   * @param sumRecordId
   */
  getFailDetails(page: number, size: number,sumRecordId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/sum/get-failed-details`, {
      'page': page,
      'size': size,
      'sumRecordId': sumRecordId,
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

}
