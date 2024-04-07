package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.dao.repository.AuthRepository;
import com.yunzainfo.education.dao.repository.SchoolRepository;
import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.dao.table.School;
import com.yunzainfo.education.entity.LoginParam;
import com.yunzainfo.education.entity.result.ResultData;
import com.yunzainfo.education.service.TokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ngf
 * @date 2020/10/9 1:41 下午
 */
@Controller
@RequestMapping("/device-manage/api/manage/school")
public class SchoolController {

    private final SchoolRepository schoolRepository;

    public SchoolController(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        List<School> list = schoolRepository.findAllByOrderByDisplayIndexAsc();
        return ResultData.okData(list);
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody School school) {
        schoolRepository.saveAndFlush(school);
        return ResultData.okData("添加成功");
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        schoolRepository.deleteById(id);
        return ResultData.okData("删除成功");
    }
}
