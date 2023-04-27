package com.yunzainfo.education.dao.table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "school")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class School {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    /*
    * 学校名称
    * */
    @Column(name = "school_name")
    private String schoolName;

    /*
    * 学校排名
    * */
    @Column(name = "school_rank")
    private String schoolRank;

    /*
    * 学校代码
    * */
    @Column(name = "school_code")
    private String schoolCode;

    /*
    * 所在省
    * */
    @Column(name = "school_province")
    private String schoolProvince;

    /*
    * 所在城市
    * */
    @Column(name = "school_city")
    private String schoolCity;

    /*
    * 创建时间
    * */
    @Column(name = "school_created")
    private String schoolCreated;

    /*
    * 学校类别
    * */
    @Column(name = "school_category")
    private String schoolCategory;

    /*
    * 所属机构
    * */
    @Column(name = "school_institution")
    private String schoolInstitution;

    /*
    *硕士点
    * */
    @Column(name = "school_master")
    private String schoolMaster;

    /*
    * 博士点
    * */
    @Column(name = "school_doctor")
    private String schoolDoctor;

    /*
    * 汇总标签
    * */
    @Column(name = "school_tag")
    private String schoolTag;

    /*
    * 学校描述
    * */
    @Column(name = "school_describe",columnDefinition = "text")
    private String schoolDescribe;

    /*
    * 本科or专科
    * */
    @Column(name = "school_nature")
    private String schoolNature;

    /*
    * 招生办电话
    * */
    @Column(name = "school_phone")
    private String schoolPhone;

    /*
    * 招生办邮箱
    * */
    @Column(name = "school_email")
    private String schoolEmail;

    /*通讯地址*/
    @Column(name = "school_address")
    private String schoolAddress;

    /*
    * 官网
    * */
    @Column(name = "school_web")
    private String schoolWeb;

    /*
    *就业情况
    * */
    @Column(name = "school_employment",columnDefinition = "text")
    private String schoolEmployment;

    /*
    * 推荐专业
    * */
    @Column(name = "school_recommend",columnDefinition = "text")
    private String schoolRecommend;
}
