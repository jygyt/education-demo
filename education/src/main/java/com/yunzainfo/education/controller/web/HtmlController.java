package com.yunzainfo.education.controller.web;

import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

/**
 * @author ngf
 * @date 2020/10/26 4:07 下午
 */
@Controller
public class HtmlController {

    @GetMapping(path = {"/home", "/index", "/"})
    public String home() {
        return "redirect:/index.html";
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
