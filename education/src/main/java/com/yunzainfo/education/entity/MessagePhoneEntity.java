package com.yunzainfo.education.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;


public class MessagePhoneEntity {

    private String id;


    private String phone;

    private Date gmtCreate;

    private String realName;

    private String address;

    private String recommendUserId;

    private String recommendUser;
}
