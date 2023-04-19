import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {YunzaiHeaders} from "../headers/http.header";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {PeopleModel} from "../model/people.model";

class searchDeviceModel {
  deviceNumber: string = null; //"设备编号/序列号",
  location: string = null; //"101会议室",
  online: number = null; //"设备状态：0离线，1在线"，
  tempStatus: number = null; //"体温模块开关：0关，1开"，
}

class DeviceImportParam {
  file: any = null;
  deviceInfoId: string = null;
}

class DeviceGroup {
  groupId: string = null;
  deviceIdList: Array<String> = [];
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  userData: any = {}

  constructor(private http: HttpClient) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }


  /**
   * 删除设备
   * @param deviceIds
   */
  delDevice(deviceIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/delete`, {
      'deviceIds': deviceIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 设备更新
   * @param deviceIds
   */
  updateDevice(deviceIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/update`, {
      'deviceIds': deviceIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 重启设备
   * @param deviceIds
   */
  restartDevice(deviceIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/restart`, {
      'deviceIds': deviceIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 设备同步
   * @param deviceIds
   */
  synchroDevice(deviceIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/syncDevice`, {
      'deviceIds': deviceIds
    }, YunzaiHeaders.APPLICATION_JSON_KEEP_ALIVE).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 新增 / 编辑设备信息
   * @param id
   * @param name
   * @param location
   * @param type "0新增，1编辑"
   * @param deviceNumber "设备编号/序列号",
   * @param tempStatus "体温模块开关：0关，1开"
   */
  editDevice(id: string, name: string, location: string, type: number, deviceNumber: string, createAuthId: string, tempStatus: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/add`, {
      'id': id,
      'name': name,
      'location': location,
      'type': type,
      'deviceNumber': deviceNumber,
      'tempStatus': tempStatus,
      'createAuthId': createAuthId,
      'statusDevice': 0,
      'online': 0,
      'statusSynchro': 0
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 分页查询设备信息   模糊查询
   * @param page
   * @param size
   * @param searchData
   */
  queryListDevice(page: number, size: number, searchData: searchDeviceModel): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/search`, {
      'page': page,
      'size': size,
      'searchData': searchData,
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 分页查询设备信息
   * @param page
   * @param size
   */
  queryDeviceByPage(page: number, size: number): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/list`, {
      'page': page,
      'size': size
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 配置人脸库地址
   * @param faceHost
   */
  faceHost(id: string, key: string, value: string, content: string): Observable<any> {
    return this.http.post(`/device-manage/api/settings/addHost`, {
      'id': id,
      'key': key,
      'value': value,
      'content': content
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 查询设备管理的人员
   * @param pageIndex
   * @param pageSize
   * @param deviceId
   * @param userNumber
   * @param userName
   * @param flagOfPart
   */
  queryListPeople(pageIndex: number,
                  pageSize: number,
                  deviceId: string,
                  userNumber: string,
                  userName: string,
                  flagOfPart: number) {
    return this.http.post(`/device-manage/api/manage/device/face/find-people`, {
      'page': pageIndex,
      'size': pageSize,
      'deviceId': deviceId,
      'userNumber': userNumber,
      'userName': userName,
      'flagOfPart': flagOfPart
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    )
  }

  /**
   * 查询已加入设备管理的人员
   * @param pageIndex
   * @param pageSize
   * @param deviceId
   * @param userNumber
   * @param userName
   * @param flagOfPart
   */
  queryListJoinPeople(pageIndex: number,
                      pageSize: number,
                      deviceId: string,
                      userNumber: string,
                      userName: string,
                      flagOfPart: number) {
    return this.http.post(`/device-manage/api/manage/device/face/find-joined-people2`, {
      'page': pageIndex,
      'size': pageSize,
      'deviceId': deviceId,
      'userNumber': userNumber,
      'userName': userName,
      'flagOfPart': flagOfPart
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    )
  }


  /**
   * 查询未加入加入设备管理的人员
   * @param pageIndex
   * @param pageSize
   * @param deviceId
   * @param userNumber
   * @param userName
   * @param flagOfPart
   */
  queryListNotJoinPeople(pageIndex: number,
                         pageSize: number,
                         deviceId: string,
                         userNumber: string,
                         userName: string,
                         flagOfPart: number) {
    return this.http.post(`/device-manage/api/manage/device/face/not-joined-people2`, {
      'page': pageIndex,
      'size': pageSize,
      'deviceId': deviceId,
      'userNumber': userNumber,
      'userName': userName,
      'flagOfPart': flagOfPart
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    )
  }


  dealWithPeople(flagOfPart: number,
                 deviceId: string,
                 selectedParam: Array<PeopleModel>) {
    return this.http.post(`/device-manage/api/manage/device/face/deal-with-people`, {
      'flagOfPart': flagOfPart,
      'deviceId': deviceId,
      'selectedParam': selectedParam
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    )
  }


  // 查询设备id  和名称
  queryDevice(): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/list-id-name`, {}, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  // 分组人员 同步到设备
  groupDeciveSycho(selectedGroup: Array<string>,
                   deviceIdList: Array<string>): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/group-device-sycho`, {
      'groupIdList': selectedGroup,
      'deviceIdList': deviceIdList
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 全部人员同步到设备
   * @param deviceId
   */
  peopleDeciveSycho(deviceIdList: Array<string>): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/people-device-sycho`, {
      'deviceIdList': deviceIdList
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
  deviceImportUser(file: any, deviceInfoId: string) {
    const formData: FormData = new FormData();
    formData.set('file', file);
    formData.set('deviceInfoId', deviceInfoId);
    return this.http.post(`/device-manage/api/manage/user/device-importuser`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  /**
   * 批量导入
   * @param file
   */
  deviceImportExcel(file: any, deviceInfoId: string) {
    const formData: FormData = new FormData();
    formData.set('file', file);
    formData.set('deviceInfoId', deviceInfoId);
    return this.http.post(`/device-manage/api/manage/user/device-import-excel`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  //=========================设备分组

  /**
   * 分页查询分组信息
   * @param pageIndex
   * @param pageSize
   * @param groupName
   */
  queryListGroup(pageIndex: number, pageSize: number, groupName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/list-device-group`, {
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
   * @param groupId
   */
  delGroup(groupId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/delete-device-group`, {
      'groupId': groupId
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
    return this.http.post(`/device-manage/api/manage/device/add-device-group`, {
      'groupName': groupName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 编辑分组信息
   * @param groupId
   * @param groupName
   */
  updateGroup(groupId: string, groupName: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/update-device-group`, {
      'groupId': groupId,
      'groupName': groupName
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 分组添加设备
   * @param deviceGroup
   */
  deviceIntoGroup(groupId: string, deviceIdList: Array<string>): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/device-into-group`, {
      'groupId': groupId,
      'deviceIdList': deviceIdList
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 分组移除设备
   * @param groupId
   * @param deviceId
   */
  deviceOutGroup(deviceId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/device-out-group`, {
      'deviceId': deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 根据分组id获取设备信息
   * @param groupId
   */
  getDevicesByGroup(groupId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device/get-device-by-group`, {
      'groupId': groupId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }


  /**
   * 获取设备人员同步情况
   * @param name
   * @param userNumber
   * @param groupId
   */
  getDevicePeople(name: string, userNumber: string, groupId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device-people/get-list`, {
      'userNumber': userNumber,
      'userName': name,
      'groupId': groupId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备人员管理-同步人员到设备 添加人员到设备
   * @param userId
   * @param deviceIds
   */
  deviceAddPeople(userId: string, deviceIds: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device-people/deviceAddPeople`, {
      'userId': userId,
      'deviceIds': deviceIds
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );

  }

  /**
   * 从设备上移除人员信息 (之后同步)
   * @param userId
   * @param deviceId
   */
  deleteDevicePeople(userId: string, deviceId: string): Observable<any> {
    return this.http.post(`/device-manage/api/manage/device-people/deleteDevicePeople`, {
      'userId': userId,
      'deviceIds': deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  /**
   * 设备开门
   * @param deviceId
   */
  openDoor(deviceId: string): Observable<any> {
    return this.http.post('/device-manage/api/manage/device/open-door', {
      'deviceIds': deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    )
  }


  getVideoUrl(deviceId: string): Observable<any> {
    return this.http.post(`/v1/driver/getVideoUrl`, {
      deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  getRecordUrl(deviceId: string): Observable<any> {
    return this.http.post(`/v1/driver/getRecordList`, {
      deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  startRecord(deviceId: string): Observable<any> {
    return this.http.post(`/v1/driver/startRecord`, {
      deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  stopRecord(deviceId: string): Observable<any> {
    return this.http.post(`/v1/driver/stopRecord`, {
      deviceId
    }, YunzaiHeaders.APPLICATION_JSON).pipe(
      map((response: any) => {
        return response ? response : null;
      })
    );
  }

  getSubList(deviceId){
    return this.http.get(`/v1/driver/getSubGatewayList/${deviceId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  subSwitchgear(deviceId,device){
    return this.http.post(`/v1/driver/subSwitchgear`, {
        deviceId,
        device,
      }
      , YunzaiHeaders.APPLICATION_JSON)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }



}
