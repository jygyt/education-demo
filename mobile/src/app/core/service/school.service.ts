import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) {
  }

  queryListSchool() {
    return this.http.get(`/device-manage/api/manage/school/findAll`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  queryListMeaages() {
    return this.http.get(`/device-manage/api/manage/message/findAll`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  deleteMessageById(id) {
    return this.http.get(`/device-manage/api/manage/message/delete/${id}`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }
  deleteById(id) {
    return this.http.get(`/device-manage/api/manage/school/delete/${id}`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  addSchool(id,
            schoolName,
            schoolPhone,
            displayIndex,
            schoolDescribe,
            picBase64) {
    return this.http.post(`/device-manage/api/manage/school/save`, {
      id,
      schoolName,
      schoolPhone,
      displayIndex,
      schoolDescribe,
      picBase64
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }
  queryListQuestion() {
    return this.http.get(`/device-manage/api/manage/self-talk/findAll`, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

}
