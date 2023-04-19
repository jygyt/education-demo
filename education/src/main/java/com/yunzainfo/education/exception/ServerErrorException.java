package com.yunzainfo.education.exception;

/**
 * @author ngf
 * @date 2020/9/9 9:20 上午
 */
public class ServerErrorException extends RuntimeException {

    public ServerErrorException(String message) {
        super(message);
    }
}
