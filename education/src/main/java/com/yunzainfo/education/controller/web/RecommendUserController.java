package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.dao.repository.MessagePhoneRepository;
import com.yunzainfo.education.dao.repository.RecommendUserRepository;
import com.yunzainfo.education.dao.table.MessagePhone;
import com.yunzainfo.education.dao.table.RecommendUser;
import com.yunzainfo.education.entity.result.ResultData;
import com.yunzainfo.education.service.AuthService;
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
@RequestMapping("/device-manage/api/manage/recommend")
public class RecommendUserController {

    @Autowired
    RecommendUserRepository recommendUserRepository;

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        List<RecommendUser> list = recommendUserRepository.findAll();
        return ResultData.okData(list);
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody RecommendUser user) {
        user.setGmtCreate(new Date());
        recommendUserRepository.saveAndFlush(user);
        return ResultData.okData("添加成功");
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        recommendUserRepository.deleteById(id);
        return ResultData.okData("删除成功");
    }
}
