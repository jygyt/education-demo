package com.yunzainfo.education.config;

import com.yunzainfo.education.handler.AuthHandlerInterceptor;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author ngf
 * @date 2020/9/29 3:28 下午
 */
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer, ErrorPageRegistrar {

    private final AuthHandlerInterceptor authHandlerInterceptor;

    public WebAppConfigurer(AuthHandlerInterceptor authHandlerInterceptor) {
        this.authHandlerInterceptor = authHandlerInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authHandlerInterceptor)
                .addPathPatterns(
                        "/device-manage/api/manage/auth/**"
                )
                .excludePathPatterns(
                        "/device-manage/api/manage/login/**"
                )
                .excludePathPatterns(
                        "/v1/video/**"
                );
    }

    @Override
    public void registerErrorPages(ErrorPageRegistry registry) {
        ErrorPage page404 = new ErrorPage(HttpStatus.NOT_FOUND, "/404.html");
        registry.addErrorPages(page404);
    }
}
