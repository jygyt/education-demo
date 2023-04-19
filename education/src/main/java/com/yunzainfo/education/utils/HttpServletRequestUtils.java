package com.yunzainfo.education.utils;

import com.yunzainfo.education.common.Common;
import com.yunzainfo.education.entity.auth.AuthEntity;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author ngf
 * @date 2020/10/16 2:04 下午
 */
public final class HttpServletRequestUtils {

    public static AuthEntity getCurrentAuth() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new RuntimeException("系统错误(01)");
        }
        return (AuthEntity) attributes.getAttribute(Common.AUTH_INFO, RequestAttributes.SCOPE_REQUEST);
    }
}
