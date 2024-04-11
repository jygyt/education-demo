package com.yunzainfo.education.dao.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recommend_user")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class RecommendUser {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "gmt_create")
    private Date gmtCreate;
    @Column(name = "gmt_modified")
    private Date gmtModified;

    @Column(name = "real_name")
    private String realName;
}
