package com.yunzainfo.education.controller.web;

import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

/**
 * @author ngf
 * @date 2020/10/26 4:07 下午
 */
@Controller
public class HtmlController {

    @GetMapping(path = {"/pc","/"})
    @ResponseStatus(HttpStatus.OK)
    public String home() {
        return "redirect:/pc/index.html";
    }

    @GetMapping(path = {"/mobile"})
    public String mobile() {
        return "redirect:/mobile/index.html";
    }


    private ConcurrentHashMap<String, Integer> statusMap = new ConcurrentHashMap<>(1024);

    private ScheduledExecutorService executorService;

    public HtmlController() {
        this.executorService = new ScheduledThreadPoolExecutor(10,
                new BasicThreadFactory.Builder()
                        .namingPattern("schedule-pool-%d")
                        .daemon(true)
                        .build()
        );
    }
}
