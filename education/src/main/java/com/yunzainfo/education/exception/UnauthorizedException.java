package com.yunzainfo.education.exception;

/**
 * @author ngf
 * @date 2020/10/16 2:55 下午
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }
}
