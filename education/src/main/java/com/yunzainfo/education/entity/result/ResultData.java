package com.yunzainfo.education.entity.result;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * @author hww
 * @date 2020/10/7
 */
@Data
public class ResultData<T> {
    private String message;
    private T data;

    public static <E> ResponseEntity<ResultData<E>> okData(E data) {
        return okMessageAndData("ok", data);
    }

    public static <E> ResponseEntity<ResultData<E>> okMessage(String message) {
        return okMessageAndData(message, null);
    }

    public static <E> ResponseEntity<ResultData<E>> okMessageAndData(String message, E data) {
        return of(200, message, data);
    }

    public static <E> ResponseEntity<ResultData<E>> errorTip(String message) {
        return of(500, message, null);
    }

    public static <E> ResponseEntity<ResultData<E>> errorTipAndData(String message, E data) {
        return of(500, message, data);
    }

    public static <E> ResponseEntity<ResultData<E>> of(HttpStatus httpStatus, String message, E data) {
        return of(httpStatus.value(), message, data);
    }

    public static <E> ResponseEntity<ResultData<E>> of(int status, String message, E data) {
        ResultData<E> resultData = new ResultData<>();
        resultData.setMessage(message);
        resultData.setData(data);
        return ResponseEntity.status(status).body(resultData);
    }
}
