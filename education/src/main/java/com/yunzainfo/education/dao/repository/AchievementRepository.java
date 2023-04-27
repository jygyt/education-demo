package com.yunzainfo.education.dao.repository;

import com.yunzainfo.education.dao.table.Achievement;
import com.yunzainfo.education.dao.table.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Repository
public interface AchievementRepository extends JpaRepository<Achievement, String> {

}
