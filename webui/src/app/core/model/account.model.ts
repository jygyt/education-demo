export class AccountModel {
  id: string = null;
  account: string = null;
  name: string = null;
  createAuthId: string = null; // 创建人
  level: string = null; // 0超级管理员，1管理员，2普通用户,
  gmtCreate: number = null;
  gmtModified: number = null;
  password:string = null;
  lock: number = null; // 帐号是否锁定(1锁定，0未锁定)
  statusAuth: number = null; // 是否删除 (0否，1是)
  refreshToken: string = null;
  createdAuthAccount:string = null;

}
