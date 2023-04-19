import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) {

  }


  /**
   * 记录导出
   */
  exportRecord(): Observable<any> {
    return this.http.get(`/device-manage/api/manage/record/exportrecord`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  // /**
  //  * 记录导出
  //  */
  // exportRecord(): Observable<any> {
  //   return this.http.post(`/device-manage/api/manage/record/exportrecord`, {
  //   }, YunzaiHeaders.APPLICATION_JSON).pipe(
  //     map((response: any) => {
  //       return response ? response : null;
  //     })
  //   );
  // }


  /**
   * 记录列表查询
   * @param page
   * @param size
   * @param recordType
   * @param userNumber
   * @param userName
   * @param startTemp
   * @param endTemp
   * @param startTime
   * @param endTime
   * @param deviceNumber
   * @param deviceName
   * @param monthTime
   */
  queryListRecord(page: number, size: number, recordType: number, userNumber: string, userName: string, startTemp: string, endTemp: string,
                  startTime: number, endTime: number, deviceNumber: string, deviceName: string, monthTime: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/record/getrecordlist`, {
      'page': page,
      "size": size,
      "recordType": recordType,
      "userNumber": userNumber,
      "userName": userName,
      "startTemp": startTemp,
      "endTemp": endTemp,
      "startTime": startTime,
      "endTime": endTime,
      "deviceNumber": deviceNumber,
      "deviceName": deviceName,
      "monthTime": monthTime
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


}
