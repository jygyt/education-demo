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
@Table(name = "message_phone")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class MessagePhone {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "message_content",columnDefinition = "text")
    private String messageContent;

    @Column(name = "gmt_create")
    private Date gmtCreate;
    @Column(name = "gmt_modified")
    private Date gmtModified;

    @Column(name = "real_name")
    private String realName;

    @Column(name = "address",columnDefinition = "text")
    private String address;

    @Column(name = "recommend_user_id")
    private String recommendUserId;
}
