//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//
package com.yunzainfo.education.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;

public class Return {
    public Return() {
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(boolean isSuccess, String message) {
        return isSuccess?((BodyBuilder)ResponseEntity.ok().headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).build()) : ((BodyBuilder)ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(boolean isSuccess, String message, T data) {
        return isSuccess ? ((BodyBuilder)ResponseEntity.ok().headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).build()) : ((BodyBuilder)ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(HttpStatus status, String message) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(HttpStatus status, String message, T data) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(HttpStatus status, String message, T data, Exception ex) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).errorMessage(ex.getMessage()).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(HttpStatus status, String message, Exception ex) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).errorMessage(ex.getMessage()).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(int status, String message) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(int status, String message, T data) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(int status, String message, T data, Exception ex) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).data(data).errorMessage(ex.getMessage()).build());
    }

    public static <T> ResponseEntity<ReturnEntity<?>> build(int status, String message, Exception ex) {
        return ((BodyBuilder)ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build())).body(ReturnEntity.builder().message(message).errorMessage(ex.getMessage()).build());
    }
}
