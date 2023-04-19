## 1.登录

### 1.1 登录

**Path：**`/api/auth/login`

**method:** `POST`

**Content-Type：** `application/json`

**参数：**

```json
{
	"account":"5",
	"password":"111111",
	"sevenDays":"true/false  是否7天内有效(可不传)"
}
```

**结果：**

```json
{
  "code":2000,
  "message": "ok",
  "data": {
    "token":""
  }
}
```

### 1.2 退出登录

**Path：**`/api/auth/logout`

**method：** `GET`

**header：** `Authorization: {token}`

**结果**

```json
{
  "message": "退出登录成功！",
  "data": null
}
```

## 2.帐号管理

### 2.1 帐号列表

**Path：**`/api/manage/auth/list`

**method：**`POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
  "page": 0,
  "size": 10
}
```

**结果**

```json
{
  "message": "ok",
  "data": {
    "total": 12,
    "list": [
      {
        "id": "16c6e4ee-0e03-4a60-8702-51d84c6dd0df",
        "account": "gg",
        "createdAuthId": "707a09dd-6364-480b-b7ab-6c49bbda7421",
        "createdAuthAccount": "7",
        "level": 1,
        "gmtCreate": 1603087863000,
        "gmtModified": 1603087863000,
        "password": "",
        "lock": 0,
        "statusAuth": 0,
        "refreshToken": null
      }
    ]
  }
}
```

### 2.2 新增/编辑帐号

**Path：**`/api/manage/auth/add`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
  "id":"type = 1时，必传",
  "account":"",
  "password":"",
  "type":"0新增，1编辑",
  "level":"1管理员，2普通用户"
}
```

**结果**

```json
{
  "message": "操作成功",
  "data": null
}
```

### 2.3 删除帐号

**Path：**`/api/manage/auth/delete`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
  "ids":"多个账号用逗号隔开"
}
```

**结果**

```json
{
  "message": "删除成功",
  "data": null
}
```

### 2.4 搜索帐号

**Path：**`/api/manage/auth/search`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
	"page":1,
	"size":10,
	"account":"账号（可为空/不传）",
	"level":"权限（可为空/不传）"
}
```

**结果**

```json
{
  "message": "ok",
  "data": {
    "total": 13,
    "list": [
      {
        "id": "c36baa5b-535a-4c52-976e-77b09161a526",
        "account": "45req",
        "createdAuthId": "1b3cb29e-efab-4580-9122-ceab8b4f7228",
        "createdAuthAccount": "5",
        "level": 1,
        "gmtCreate": 1603178545000,
        "gmtModified": 1603178545000,
        "password": "",
        "lock": 0,
        "statusAuth": 0,
        "refreshToken": null
      }
    ]
  }
}
```

### 2.5 重置密码

**Path：**`/api/manage/auth/resetpwd`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
  "account":"admin",
  "password":"111111"
}
```

**结果**

```json
{
  "message": "重置密码成功",
  "data": null
}
```

### 2.6 锁定帐号

**Path：**`/api/manage/auth/lock`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
  "authId": "",
  "lock": "0解锁/1锁定"
}
```

**结果**

```json
{
  "message": "锁定帐号成功",
  "data": null
}
```

### 2.7 获取当前账户信息

**Path：**`/api/manage/auth/info`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
无
```

**结果**

```json
{
  "message": "ok",
  "data": {
    "id": "1b3cb29e-efab-4580-9122-ceab8b4f7228",
    "account": "5",
    "createdAuthId": "16c6e4ee-0e03-4a60-8702-51d84c6dd0df",
    "createdAuthAccount": null,
    "level": 1,
    "gmtCreate": 1602050080000,
    "gmtModified": 1602050080000,
    "password": "",
    "lock": 0,
    "statusAuth": 0,
    "refreshToken": ""
  }
}
```

### 2.8 根据Id查询账户信息

**Path：**`/api/manage/auth/findById`

**method:** `POST`

**header：** `Authorization: {token}`

**Content-Type：** `application/json`

**参数：**

```json
{
	"authId":""
}
```

**结果**

```json
{
  "message": "ok",
  "data": {
    "id": "1b3cb29e-efab-4580-9122-ceab8b4f7228",
    "account": "5",
    "createdAuthId": "16c6e4ee-0e03-4a60-8702-51d84c6dd0df",
    "createdAuthAccount": null,
    "level": 1,
    "gmtCreate": 1602050080000,
    "gmtModified": 1602050080000,
    "password": "",
    "lock": 0,
    "statusAuth": 0,
    "refreshToken": ""
  }
}
```
