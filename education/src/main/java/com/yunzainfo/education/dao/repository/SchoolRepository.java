package com.yunzainfo.education.dao.repository;

import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.dao.table.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Repository
public interface SchoolRepository extends JpaRepository<School, String> {

    List<School> findAllByOrderByDisplayIndexAsc();

}
