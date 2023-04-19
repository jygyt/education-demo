package com.yunzainfo.education.dao.repository;

import com.yunzainfo.education.dao.table.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Repository
public interface AuthRepository extends JpaRepository<Auth, String> {
    /**
     * 根据账户查询账户对象
     *
     * @param account 账户
     * @return
     */
    Auth findByAccount(String account);
}
