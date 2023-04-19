import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OuiLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        // doing something

        resolve();
      }, 3000);
    });
  }

  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')){
      const promise = this.httpClient.get(`/device-manage/api/manage/login/oui/login`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})})
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);
        localStorage.setItem("sid",settings['data'].sid)
        return settings;
      });
      return promise;
    }
    return null;
  }

}
