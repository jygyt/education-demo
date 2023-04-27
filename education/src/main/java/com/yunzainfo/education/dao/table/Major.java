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
@Table(name = "major")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class Major {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;
    /*
    * 学科门类
    * */
    @Column(name = "major_discipline")
    private String majorDiscipline;

    /*
    * 专业类
    * */
    @Column(name = "major_type")
    private String majorType;

    /*
    * 层次
    * */
    @Column(name = "major_level")
    private String majorLevel;

    /*
    * 专业名称
    * */
    @Column(name = "major_name")
    private String majorName;

    /*
    * 专业代码
    * */
    @Column(name = "major_code")
    private String majorCode;

    /*
    * 修业年限
    * */
    @Column(name = "major_year")
    private String majorYear;

    /*
    * 授予学位
    * */
    @Column(name = "major_degree")
    private String majorDegree;

    /*
    * 学科建议
    * */
    @Column(name = "major_advice")
    private String majorDdvice;

    /*
    * 专业介绍
    * */
    @Column(name = "major_introduce")
    private String majorIntroduce;

    /*
    * 专业学习
    * */
    @Column(name = "major_study",columnDefinition = "text")
    private String majorStudy;

    /*
    * 专业干什么
    * */
    @Column(name = "major_deployment",columnDefinition = "text")
    private String majorDeployment;

    /*
    * 就业方向
    * */
    @Column(name = "major_deployment_direction",columnDefinition = "text")
    private String majorDeploymentDirection;

    /*
    *行业分布
    * */
    @Column(name = "major_deployment_trade",columnDefinition = "text")
    private String majorDeploymentTrade;

    /*
    * 岗位分布
    * */
    @Column(name = "major_deployment_post",columnDefinition = "text")
    private String majorDeploymentPost;
}
