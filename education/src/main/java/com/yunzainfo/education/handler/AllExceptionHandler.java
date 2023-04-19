package com.yunzainfo.education.handler;

import com.yunzainfo.education.entity.result.ResultData;
import com.yunzainfo.education.exception.ServerErrorException;
import com.yunzainfo.education.exception.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * @author ngf
 * @date 2020/9/18 10:21 上午
 */
@Slf4j
@ControllerAdvice
public class AllExceptionHandler {

    @ExceptionHandler(ServerErrorException.class)
    public ResponseEntity<?> serverErrorException(ServerErrorException e, HttpServletRequest request) {
        log.error("【业务错误】:{}", e.getMessage());
        return ResultData.of(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> unauthorizedException(UnauthorizedException e) {
        log.error("【授权错误】:{}", e.getMessage());
        return ResultData.of(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("【参数错误】:{}", e.getMessage());
        StringBuilder tip = new StringBuilder();
        for(FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            tip.append(fieldError.getField())
                    .append(":")
                    .append(fieldError.getDefaultMessage())
                    .append(" ");
        }
        return ResultData.of(HttpStatus.BAD_REQUEST, e.getMessage(), e);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exception(Exception e) {
        log.error("【系统错误】", e);
        return ResultData.of(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
    }
}
