package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.dao.repository.MessagePhoneRepository;
import com.yunzainfo.education.dao.repository.SchoolRepository;
import com.yunzainfo.education.dao.table.MessagePhone;
import com.yunzainfo.education.dao.table.School;
import com.yunzainfo.education.entity.result.ResultData;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author ngf
 * @date 2020/10/9 1:41 下午
 */
@Controller
@RequestMapping("/device-manage/api/manage/message")
public class MessagePhoneController {

    private final MessagePhoneRepository messagePhoneRepository;

    public MessagePhoneController(MessagePhoneRepository messagePhoneRepository) {
        this.messagePhoneRepository = messagePhoneRepository;
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        List<MessagePhone> list = messagePhoneRepository.findAllByOrderByGmtCreateDesc();
        return ResultData.okData(list);
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody MessagePhone messagePhone) {
        messagePhoneRepository.saveAndFlush(messagePhone);
        return ResultData.okData("添加成功");
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        messagePhoneRepository.deleteById(id);
        return ResultData.okData("删除成功");
    }
}
