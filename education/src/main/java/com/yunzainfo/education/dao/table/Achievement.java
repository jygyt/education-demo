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
@Table(name = "achievement")
@GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
public class Achievement {
    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    /*
    * 年份
    * */
    @Column(name = "achievement_year")
    private String achievementYear;

    /*
    * 批次
    * */
    @Column(name = "achievement_batch")
    private String achievementBatch;

    /*
    *专业科类
    * */
    @Column(name = "major_discipline")
    private String majorDiscipline;

    /*
    * 院校代码
    * */
    @Column(name = "school_code")
    private String schoolCode;

    /*
    * 院校名称
    * */
    @Column(name = "school_name")
    private String schoolName;

    /*
    * 专业代码
    * */
    @Column(name = "major_code")
    private String majorCode;

    /*
    * 专业名称
    * */
    @Column(name = "major_name")
    private String majorName;

    /*
    *选科要求
    * */
    @Column(name = "select_ask")
    private String selectAsk;

    /*
    * 计划人数
    * */
    @Column(name = "plan_num")
    private String planNum;

    /*
    * 最低分
    * */
    @Column(name = "low_score")
    private String lowScore;

    /*
    * 最高分
    * */
    @Column(name = "high_score")
    private String highScore;
}
