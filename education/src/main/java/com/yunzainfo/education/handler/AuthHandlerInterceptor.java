package com.yunzainfo.education.handler;

import com.yunzainfo.education.common.Common;
import com.yunzainfo.education.entity.auth.AuthEntity;
import com.yunzainfo.education.service.TokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * @author ngf
 * @date 2020/9/29 2:14 下午
 */
@Component
public class AuthHandlerInterceptor implements HandlerInterceptor {

    private final TokenService tokenService;

    public AuthHandlerInterceptor(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessTokenBase64 = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (accessTokenBase64 == null) {
            response.setStatus(401);
            PrintWriter writer = response.getWriter();
            writer.print("Not Authorization");
            return false;
        }

        AuthEntity auth = tokenService.validatedAccessToken(accessTokenBase64);
        // 用户不存在或被锁定
        if (auth == null || auth.getLock() == 1 || auth.getStatusAuth() == 1) {
            response.setStatus(401);
            PrintWriter writer = response.getWriter();
            writer.print("Not Authorization");
            return false;
        }

        request.setAttribute(Common.AUTH_INFO, auth);
        return true;
    }
}
