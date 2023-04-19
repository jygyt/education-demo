import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment.prod";

class userGroup {
  groupId: string = null;
  userId: Array<String> = [];
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) {
  }

  /**
   *  新增 / 编辑 人员
   * @param id
   * @param name
   * @param userNumber
   * @param type
   * @param idcard
   * @param mobile
   * @param faceImageBase64
   * @param sex
   * @param age
   */
  savePeople(userType: number, id: string, name: string, userNumber: string, type: number, idcard: string, mobile: string, faceImageBase64: string, sex: number, age: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/adduser`, {
      'typeUser': userType,
      'id': id,
      'name': name,
      'userNumber': userNumber,
      'type': type,
      'idcard': idcard,
      'mobile': mobile,
      'faceImageBase64': faceImageBase64,
      'sex': sex,
      'age': age
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 删除人员
   * @param userIds
   */
  delPeople(userIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/deleteuser`, {
      'userIds': userIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 分页查询(有人脸照片)
   * @param userNumber
   * @param userName
   * @param page
   * @param size
   */
  queryListPeople1(userNumber: string, userName: string, page: number, size: number, groupId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/list`, {
      'userNumber': userNumber,
      'userName': userName,
      'page': page,
      'size': size,
      'groupId': groupId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 分页查询(没有人脸照片)
   * @param userNumber
   * @param userName
   * @param page
   * @param size
   */
  queryListPeople(userNumber: string, userName: string, page: number, size: number, groupId: string, statusFace: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/findList`, {
      'userNumber': userNumber,
      'userName': userName,
      'page': page,
      'size': size,
      'groupId': groupId,
      'statusFace': statusFace
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 获取人员信息
   * @param userIds
   */
  getPeopleInfo(userIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/getFaceBase64`, {
      'userIds': userIds,
      'page': 1,
      'size': 20
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  getPeopleInfoByUserNumber(userNumber: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/getFaceBase64-by-userNumber`, {
      'userNumber': userNumber
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 批量导入
   * @param file
   */
  importUser1(file: any): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/importuser`, {
      'file': file
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 批量导入
   * @param file
   */
  importUser(file: any) {
    const formData: FormData = new FormData();
    formData.set('file', file);
    return this.http.post(`/device-manage/api/manage/user/device-importuser`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  /**
   * 批量导出
   * @param file
   */
  exportUser(userIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/exportuser`, {
      'userIds': userIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  // /**
  //  * 同步人脸库
  //  */
  // synchroface(): Observable<any> {
  //   return this.http.post(`/device-manage/api/manage/user/synchroface`, {
  //   }, YunzaiHeaders.APPLICATION_JSON).pipe(
  //     map((response: any) => {
  //       return response ? response : null;
  //     })
  //   );
  // }
// ${environment.synchroUrl}
  /**
   * 同步人脸库
   */
  // synchroface(): Observable<any> {
  //   return this.http.post(`/synchro/synchroToDeviceManage`, {}, YunzaiHeaders.APPLICATION_JSON).pipe(
  //     map((response: any) => {
  //       return response ? response : null;
  //     })
  //   );
  // }
  synchroface(): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/face/synchroOaToDevice`, {}, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 系统配置查询
   * @param key
   */
  queryFaceHost(key: string): Observable<any> {
    return this.http.post(`/device-manage/api/settings/getsettings`, {
      'key': key
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 上传人脸照片
   * @param file
   */
  uploadFaceImg(file: any) {
    const formData: FormData = new FormData();
    formData.set('file', file);
    return this.http.post(`/device-manage/api/manage/user/uploadFaceImage`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * 分页查询分组信息
   * @param pageIndex
   * @param pageSize
   * @param groupName
   */
  queryListGroup(pageIndex: number, pageSize: number, groupName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/list-group`, {
      'page': pageIndex,
      'size': pageSize,
      'groupName': groupName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 删除分组信息
   * @param groupIds
   */
  delGroup(groupIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/delete-group`, {
      'groupIds': groupIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 添加分组信息
   * @param groupName
   */
  addGroup(groupName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/add-group`, {
      'groupName': groupName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 更新分组信息
   * @param groupId
   * @param groupName
   */
  updateGroup(groupId: string, groupName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/update-group`, {
      'groupId': groupId,
      'groupName': groupName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 人员加入分组
   * @param userGroup
   */
  peopleJoinGroup(userGroup: userGroup): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/people-join-group`, {
      'groupId': userGroup.groupId,
      'userId': userGroup.userId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  removeFromGroup(groupId: string, userIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/user/people-out-group`, {
      'groupId': groupId,
      'userIds': userIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设置出入时间
   * @param startTime
   * @param endTime
   * @param userNumber
   */
  canOutTime(startTime: number, endTime: number, userNumber: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/out-time/add-time`, {
      'startTime': startTime,
      'endTime': endTime,
      'userNumber': userNumber
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 获取某人的进出时间
   * @param userNumber
   */
  getOutTime(userNumber: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/out-time/get-time`, {
      'userNumber': userNumber
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 分组批量导入人员信息
   * @param file
   */
  groupImportExcel(file: any, groupId: string) {
    const formData: FormData = new FormData();
    formData.set('file', file);
    formData.set('groupId', groupId);
    return this.http.post(`/device-manage/api/manage/user/group-import-excel`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
