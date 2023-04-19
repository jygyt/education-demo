package com.yunzainfo.education.service.impl;

import com.yunzainfo.education.dao.repository.AccessTokenRepository;
import com.yunzainfo.education.dao.repository.AuthRepository;
import com.yunzainfo.education.dao.table.AccessToken;
import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.entity.auth.AuthEntity;
import com.yunzainfo.education.exception.ServerErrorException;
import com.yunzainfo.education.exception.UnauthorizedException;
import com.yunzainfo.education.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

/**
 * @author ngf
 * @date 2020/9/29 3:53 下午
 */
@Service
@Slf4j
@Transactional(rollbackFor = Exception.class)
public class TokenServiceImpl implements TokenService {

    /**
     * 秒计算 = 60分钟
     */
    private final static Integer DEFAULT_MAX_INACTIVE_INTERVAL = 3600;

    /**
     * 12 * 60 * 60 半天
     */
    private final static Integer DEFAULT_HALF_DAY_INACTIVE_INTERVAL = 43_200;

    private final AccessTokenRepository accessTokenRepository;
    private final AuthRepository authRepository;

    public TokenServiceImpl(AccessTokenRepository accessTokenRepository,
                            AuthRepository authRepository) {
        this.accessTokenRepository = accessTokenRepository;
        this.authRepository = authRepository;
    }

    @Override
    public String creatToken(String userId) {
        return creatToken(userId, DEFAULT_MAX_INACTIVE_INTERVAL);
    }

    @Override
    public String creatToken(String authId, int seconds) {
        AccessToken accessToken = new AccessToken();
        accessToken.setAuthId(authId);
        accessToken.setAccessToken(UUID.randomUUID().toString().replace("-",""));

        Long creationTime = System.currentTimeMillis();
        accessToken.setGmtCreate(creationTime);
        accessToken.setLastAccessTime(creationTime);
        accessToken.setMaxInactiveInterval(seconds);
        accessToken.setExpiryTime(creationTime + seconds * 1000);

        accessTokenRepository.saveAndFlush(accessToken);

        return Base64.getEncoder().encodeToString(accessToken.getAccessToken().getBytes());
    }

    @Override
    public AuthEntity validatedAccessToken(String accessTokenBase64) {
        String accessToken;
        try {
            accessToken = new String(Base64.getDecoder().decode(accessTokenBase64.getBytes()));
        } catch (IllegalArgumentException e) {
            throw new ServerErrorException("Missing or invalid Authorization header");
        }
        AccessToken accessTokenData = accessTokenRepository.findByAccessToken(accessToken);
        if (accessTokenData == null) {
            throw new ServerErrorException("Invalid token");
        }

        Long currentTime = System.currentTimeMillis();
        // Token是否过期
        if (accessTokenData.getExpiryTime() <= currentTime) {
            accessTokenRepository.delete(accessTokenData);
            throw new UnauthorizedException("Token is invalid");
        }

        if (accessTokenData.getMaxInactiveInterval() < DEFAULT_HALF_DAY_INACTIVE_INTERVAL) {
            accessTokenData.setLastAccessTime(currentTime);
            accessTokenData.setExpiryTime(currentTime + accessTokenData.getMaxInactiveInterval() * 1000);
            accessTokenRepository.saveAndFlush(accessTokenData);
        }

        Optional<Auth> optionalAuth = authRepository.findById(accessTokenData.getAuthId());
        AuthEntity authEntity = new AuthEntity();
        BeanUtils.copyProperties(optionalAuth.get(), authEntity);
        if(optionalAuth.get() != null && authEntity != null) {
            return authEntity;
        } else {
            return new AuthEntity();
        }
    }

    @Override
    public void invalidate(String accessTokenBase64) {
        String accessToken = new String(Base64.getDecoder().decode(accessTokenBase64.getBytes()));
        accessTokenRepository.deleteByAccessToken(accessToken);
    }

    @Override
    public void changePassword(String authId) {
        accessTokenRepository.deleteByAuthId(authId);
        Optional<Auth> optionalAuth = authRepository.findById(authId);
        if (optionalAuth.isPresent()) {
            Auth auth = optionalAuth.get();
            auth.setRefreshToken(null);
            authRepository.saveAndFlush(auth);
        }
    }
}
