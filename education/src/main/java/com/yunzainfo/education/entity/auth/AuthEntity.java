package com.yunzainfo.education.entity.auth;

import lombok.Data;

import java.util.Date;

/**
 * @author ngf
 * @date 2020/10/7
 */
@Data
public class AuthEntity {

    private String id;

    private String account;

    private String createdAuthId;

    private String createdAuthAccount;
    /**
     * 等级/权限(0超级管理员,1管理员,2普通用户)
     */
    private Integer level;

    private Date gmtCreate;

    private Date gmtModified;

    private String password;

    /**
     * 帐号是否锁定(1锁定，0未锁定)
     */
    private Integer lock;

    /**
     * 是否删除 (0否，1是)
     */
    private Integer statusAuth;

    private String refreshToken;

}
