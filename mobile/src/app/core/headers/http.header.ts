import {HttpHeaders} from '@angular/common/http';

export class YunzaiHeaders {
  static APPLICATION_JSON = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  static APPLICATION_JSON_KEEP_ALIVE = {headers: new HttpHeaders({'Content-Type': 'application/json','Connection':'keep-alive'})};
  static XXX_FROM = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  static FROM_DATA = {headers: new HttpHeaders({'Content-Type': 'application/form-data'})};

}
