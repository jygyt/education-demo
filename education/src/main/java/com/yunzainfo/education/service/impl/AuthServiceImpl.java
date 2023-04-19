package com.yunzainfo.education.service.impl;

import com.yunzainfo.education.dao.repository.AuthRepository;
import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.entity.PageParam;
import com.yunzainfo.education.entity.auth.AuthEntity;
import com.yunzainfo.education.entity.auth.AuthParam;
import com.yunzainfo.education.exception.ServerErrorException;
import com.yunzainfo.education.service.AuthService;
import com.yunzainfo.education.utils.HttpServletRequestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author ngf
 * @date 2020/10/7
 */
@Service
public class AuthServiceImpl implements AuthService {

    @Resource
    private AuthRepository authRepository;

    /**
     * 分页查询账户
     *
     * @param pageParam 页面信息
     * @return
     */
    @Override
    public Map<String, Object> listAuth(PageParam pageParam) {
        Map<String, Object> map = new HashMap<>();
        Pageable pageable = pageParam.getPageRequestBySort(Sort.by(Sort.Direction.DESC, "gmtCreate"));
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("status_auth", ExampleMatcher.GenericPropertyMatchers.contains());
        Auth auth = new Auth();
        auth.setStatusAuth(0);
        Example<Auth> example = Example.of(auth, matcher);
        Page<Auth> authPage = authRepository.findAll(example, pageable);
        long total = authRepository.count(example);
        List<Auth> authList = authPage.getContent();
        List<AuthEntity> authEntityList = authList.stream()
                .map(item -> {
                    AuthEntity authEntity = new AuthEntity();
                    BeanUtils.copyProperties(item, authEntity);
                    Optional<Auth> optionalAuth = authRepository.findById(item.getCreatedAuthId());
                    if (optionalAuth.isPresent()) {
                        authEntity.setCreatedAuthAccount(optionalAuth.get().getAccount());
                    }
                    authEntity.setPassword("");
                    return authEntity;
                })
                .collect(Collectors.toList());
        map.put("total", total);
        map.put("list", authEntityList);
        return map;
    }

    /**
     * 新增/编辑帐号
     *
     * @param authParam 新增/编辑帐号对象
     */
    @Override
    public void addAuth(AuthParam authParam) {
        Auth authByAccount = authRepository.findByAccount(authParam.getAccount());
        if (authParam.getType() == 0) {
            // 新增
            Auth auth = new Auth();
            if (authByAccount != null) {
                if(authByAccount.getStatusAuth() == 1 || authByAccount.getLock() == 1) {
                    auth.setId(authByAccount.getId());
                } else {
                    throw new ServerErrorException("账号已存在");
                }
            } else {
                auth.setId(UUID.randomUUID().toString().replace("-",""));
            }
            auth.setAccount(authParam.getAccount());
            auth.setLevel(authParam.getLevel());
            auth.setGmtCreate(new Date());
            auth.setGmtModified(new Date());
            auth.setPassword(authParam.getPassword());
            auth.setCreatedAuthId(HttpServletRequestUtils.getCurrentAuth().getId());
            auth.setLock(0);
            auth.setStatusAuth(0);
            authRepository.save(auth);
        }
        if (authParam.getType() == 1) {
            // 编辑
            if (StringUtils.isBlank(authParam.getId())) {
                throw new ServerErrorException("id 不存在");
            }
            Optional<Auth> authOptional = authRepository.findById(authParam.getId());
            if (!authOptional.isPresent()) {
                throw new ServerErrorException("账号不存在");
            }
            Auth auth = authOptional.get();
            if (authByAccount != null && !auth.getAccount().equals(authParam.getAccount())) {
                throw new ServerErrorException("账号已存在");
            }
            auth.setAccount(authParam.getAccount());
            auth.setPassword(authParam.getPassword());
            auth.setLevel(authParam.getLevel());
            auth.setGmtModified(new Date());
            authRepository.save(auth);
        }
    }

    /**
     * 删除帐号
     *
     * @param ids 多个账号用逗号隔开
     */
    @Transactional(rollbackFor = ServerErrorException.class)
    @Override
    public void deleteAuth(String ids) {
        String[] idList = ids.split(",");
        for (String id : idList) {
            Optional<Auth> authOptional = authRepository.findById(id);
            if (!authOptional.isPresent()) {
                throw new ServerErrorException("id 不存在");
            }
            Auth auth = authOptional.get();
            auth.setStatusAuth(1);
            authRepository.save(auth);
        }
    }

    /**
     * 搜索账号
     *
     * @param page    当前页
     * @param size    页面大小
     * @param account 账号
     * @param level   等级/权限(0超级管理员,1管理员,2普通用户)
     * @return
     */
    @Override
    public Map<String, Object> selectAuth(Integer page, Integer size, String account, Integer level) {
        Map<String, Object> map = new HashMap<>();
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("account", ExampleMatcher.GenericPropertyMatchers.contains())
                .withMatcher("level", ExampleMatcher.GenericPropertyMatchers.contains())
                .withMatcher("status_auth", ExampleMatcher.GenericPropertyMatchers.contains());
        Auth auth = new Auth();
        auth.setAccount(account);
        auth.setLevel(level);
        auth.setStatusAuth(0);
        Example<Auth> authExample = Example.of(auth, matcher);
        Pageable pageable = PageRequest.of(page - 1, size, Sort.Direction.DESC, "gmtCreate");
        Page<Auth> authPage = authRepository.findAll(authExample, pageable);
        long total = authRepository.count(authExample);
        List<Auth> authList = authPage.getContent();
        List<AuthEntity> authEntityList = authList.stream()
                .map(item -> {
                    AuthEntity authEntity = new AuthEntity();
                    BeanUtils.copyProperties(item, authEntity);
                    Optional<Auth> optionalAuth = authRepository.findById(item.getCreatedAuthId());
                    if (optionalAuth.isPresent()) {
                        authEntity.setCreatedAuthAccount(optionalAuth.get().getAccount());
                    }
                    authEntity.setPassword("");
                    return authEntity;
                })
                .collect(Collectors.toList());
        map.put("total", total);
        map.put("list", authEntityList);
        return map;
    }

    /**
     * 重置密码
     *
     * @param account  账号
     * @param password 密码
     */
    @Override
    public void updatePassword(String account, String password) {
        Auth auth = authRepository.findByAccount(account);
        if (auth == null) {
            throw new ServerErrorException("account 不存在");
        }
        auth.setPassword(password);
        authRepository.save(auth);
    }

    /**
     * 锁定账户
     *
     * @param authId 用户Id
     * @param lock   帐号是否锁定(1锁定，0未锁定)
     */
    @Override
    public void updateLock(String authId, Integer lock) {
        Optional<Auth> authOptional = authRepository.findById(authId);
        if (!authOptional.isPresent()) {
            throw new ServerErrorException("authId 不存在");
        }
        Auth auth = authOptional.get();
        auth.setLock(lock);
        authRepository.save(auth);
    }

    /**
     * 根据Id查询账户信息
     *
     * @param param authId
     * @return
     */
    @Override
    public AuthEntity findById(AuthParam param) {
        Optional<Auth> optionalAuth = authRepository.findById(param.getAuthId());
        if (!optionalAuth.isPresent()) {
            throw new ServerErrorException("id 不存在");
        }
        Auth auth = optionalAuth.get();
        AuthEntity authEntity = new AuthEntity();
        BeanUtils.copyProperties(auth, authEntity);
        Optional<Auth> authOptional = authRepository.findById(auth.getCreatedAuthId());
        if (authOptional.isPresent()) {
            authEntity.setCreatedAuthAccount(optionalAuth.get().getAccount());
        }
        return authEntity;
    }
}
