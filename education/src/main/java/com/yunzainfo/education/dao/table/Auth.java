package com.yunzainfo.education.dao.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auth")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class Auth {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;
    @Column(name = "account", unique = true)
    private String account;
    @Column(name = "created_auth_id")
    private String createdAuthId;
    /**
     * 等级/权限(0超级管理员,1管理员,2普通用户)
     */
    @Column(name = "level")
    private Integer level;
    @Column(name = "gmt_create")
    private Date gmtCreate;
    @Column(name = "gmt_modified")
    private Date gmtModified;
    @Column(name = "password")
    private String password;
    /**
     * 帐号是否锁定(1锁定，0未锁定)
     */
    @Column(name = "`lock`")
    private Integer lock;
    /**
     * 是否删除 (0否，1是)
     */
    @Column(name = "status_auth")
    private Integer statusAuth;

    @Column(name = "refresh_token")
    private String refreshToken;
}
