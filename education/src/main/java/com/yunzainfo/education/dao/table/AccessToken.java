package com.yunzainfo.education.dao.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "access_token")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class AccessToken {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;
    @Column(name = "access_token")
    private String accessToken;
    @Column(name = "gmt_create")
    private Long gmtCreate;
    @Column(name = "last_access_time")
    private Long lastAccessTime;
    @Column(name = "max_inactive_interval")
    private Integer maxInactiveInterval;
    @Column(name = "expiry_time")
    private Long expiryTime;
    @Column(name = "auth_id")
    private String authId;
}
