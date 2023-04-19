package com.yunzainfo.education.entity;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author ngf
 * @date 2020/9/29 4:17 下午
 */
@Data
public class TokenData {

    @Id
    @GeneratedValue(generator = "uuid")
    private String primaryId;

    private String accessToken;

    private Long creationTime;
    private Long lastAccessTime;
    private Integer maxInactiveInterval;
    private Long expiryTime;

    private String scope;
    private String userId;

}
