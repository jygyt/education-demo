package com.yunzainfo.education.service;

import com.yunzainfo.education.entity.PageParam;
import com.yunzainfo.education.entity.auth.AuthEntity;
import com.yunzainfo.education.entity.auth.AuthParam;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author ngf
 * @date 2020/10/7
 */
@Component
public interface AuthService {

    /**
     * 分页查询账户
     *
     * @param pageParam 页面信息
     * @return
     */
    Map<String, Object> listAuth(PageParam pageParam);

    /**
     * 新增/编辑帐号
     *
     * @param authParam 新增/编辑帐号对象
     */
    void addAuth(AuthParam authParam);

    /**
     * 删除帐号
     *
     * @param ids 多个账号用逗号隔开
     */
    void deleteAuth(String ids);

    /**
     * 搜索账号
     *
     * @param page    当前页
     * @param size    页面大小
     * @param account 账号
     * @param level   等级/权限(0超级管理员,1管理员,2普通用户)
     * @return
     */
    Map<String, Object> selectAuth(Integer page, Integer size, String account, Integer level);

    /**
     * 重置密码
     *
     * @param account  账号
     * @param password 密码
     */
    void updatePassword(String account, String password);

    /**
     * 锁定账户
     *
     * @param authId 用户Id
     * @param lock   帐号是否锁定(1锁定，0未锁定)
     */
    void updateLock(String authId, Integer lock);

    /**
     * 根据Id查询账户信息
     *
     * @param param id
     * @return
     */
    AuthEntity findById(AuthParam param);
}
