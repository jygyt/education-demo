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
@Table(name = "self_talk")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class SelfTalk {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(name = "question",columnDefinition = "text")
    private String question;

    @Column(name = "answer",columnDefinition = "LONGTEXT")
    private String answer;

    @Column(name = "gmt_create")
    private Date gmtCreate;
    @Column(name = "gmt_modified")
    private Date gmtModified;
}
