import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {YunzaiHeaders} from '../headers/http.header';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,) {
  }

  /**
   * 登录
   * @param account
   * @param password
   */
  login(account: string, password: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/login/login`, {
      'account': account,
      'password': password,
      'sevenDays': true
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response.data ? response.data : null;
      })
    );
  }

  /**
   * 退出登录
   */
  loginOut(): Observable<any> {
    return this.http.get(`/device-manage/api/manage/login/logout`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`/device-manage/api/manage/auth/info`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


}
