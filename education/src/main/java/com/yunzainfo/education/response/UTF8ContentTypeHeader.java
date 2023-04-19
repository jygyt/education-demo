package com.yunzainfo.education.response;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class UTF8ContentTypeHeader {
    public UTF8ContentTypeHeader() {
    }

    public static HttpHeaders build() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("application/json;charset=UTF-8"));
        return headers;
    }
}

