package com.yunzainfo.education.dao.repository;

import com.yunzainfo.education.dao.table.AccessToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ngf
 * @date 2020/10/6
 */
@Repository
public interface AccessTokenRepository extends JpaRepository<AccessToken,String> {

    /**
     * 根据accessToken查询token信息
     *
     * @param accessToken
     * @return
     */
    AccessToken findByAccessToken(String accessToken);

    /**
     * 根据accessToken删除token信息
     *
     * @param accessToken
     */
    void deleteByAccessToken(String accessToken);

    /**
     * authId 删除token信息
     *
     * @param authId
     */
    void deleteByAuthId(String authId);
}
