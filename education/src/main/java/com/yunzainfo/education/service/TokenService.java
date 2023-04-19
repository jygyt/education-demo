package com.yunzainfo.education.service;

import com.yunzainfo.education.entity.auth.AuthEntity;
import org.springframework.stereotype.Component;

/**
 * @author ngf
 * @date 2020/9/29 2:15 下午
 */
@Component
public interface TokenService {

    /**
     * 创建web_AccessToken-base64
     *
     * @param userId
     * @return
     */
    String creatToken(String userId);

    /**
     * 创建具有效的token
     *
     * @param userId  用户ID
     * @param seconds token保质期 秒
     * @return
     */
    String creatToken(String userId, int seconds);

    /**
     * 验证AccessToken
     *
     * @param accessTokenBase64
     * @return true token有效 false token无效
     */
    AuthEntity validatedAccessToken(String accessTokenBase64);

    /**
     * 移除accessToken
     *
     * @param accessTokenBase64
     */
    void invalidate(String accessTokenBase64);

    /**
     * 根据用户移除accessToken
     *
     * @param userId
     */
    void changePassword(String userId);
}
