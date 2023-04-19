package com.yunzainfo.education.utils;

import com.alibaba.fastjson.JSON;
import okhttp3.*;

import java.io.IOException;

public class HttpUtil {
    public String post(Object object, String address) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, JSON.toJSONString(object));
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(address)
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        Response response = client.newCall(request).execute();
        String responseData = response.body().string();
        return responseData;
    }



    public String get(String url) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url(url)
                .method("GET", null)
                .build();
        Response response = client.newCall(request).execute();
        String responseData = response.body().string();
        return responseData;
    }
}
