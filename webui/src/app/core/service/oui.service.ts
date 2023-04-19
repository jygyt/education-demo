import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OuiService {

  constructor(private http: HttpClient) {

  }

  getInterfaceStatus(sid): Observable<any> {
    return this.http.get(`/device-manage/api/manage/rpc/interface/status/${sid}`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  getInterfaceType(sid): Observable<any> {
    return this.http.get(`/device-manage/api/manage/rpc/interface/type/${sid}`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

}
