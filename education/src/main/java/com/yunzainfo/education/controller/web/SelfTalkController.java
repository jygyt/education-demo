package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.dao.repository.RecommendUserRepository;
import com.yunzainfo.education.dao.repository.SelfTalkRepository;
import com.yunzainfo.education.dao.table.RecommendUser;
import com.yunzainfo.education.dao.table.SelfTalk;
import com.yunzainfo.education.entity.result.ResultData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author ngf
 * @date 2020/10/9 1:41 下午
 */
@Controller
@RequestMapping("/device-manage/api/manage/self-talk")
public class SelfTalkController {

    @Autowired
    SelfTalkRepository selfTalkRepository;

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        List<SelfTalk> list = selfTalkRepository.findAll();
        return ResultData.okData(list);
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody SelfTalk selfTalk) {
        selfTalk.setGmtCreate(new Date());
        selfTalkRepository.saveAndFlush(selfTalk);
        return ResultData.okData("添加成功");
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        selfTalkRepository.deleteById(id);
        return ResultData.okData("删除成功");
    }
}
