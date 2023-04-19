package com.yunzainfo.education.dao.mapper;

import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.entity.auth.AuthEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ngf
 * @date 2020/10/16
 */
@Mapper
public interface AuthMapper {
    /**
     * 帐号列表
     *
     * @return
     */
    List<AuthEntity> findAuthList();

    /**
     * 根据账号和等级权限查询账户列表
     *
     * @param account 账号
     * @param level   等级/权限(0超级管理员,1管理员,2普通用户)
     * @return
     */
    List<AuthEntity> findAuthListByAccountAndLevel(@Param("account") String account, @Param("level") Integer level);

    /**
     * 根据id查询账户信息
     *
     * @param id 账户id
     * @return
     */
    AuthEntity findAuthById(@Param("id") String id);

    /**
     * 根据account查询账户信息
     *
     * @param account 账号
     * @return
     */
    Auth findByAccount(@Param("account") String account);

    /**
     * 根据id查询账户信息
     *
     * @param id id
     * @return
     */
    Auth selectAuthById(@Param("id") String id);
}
