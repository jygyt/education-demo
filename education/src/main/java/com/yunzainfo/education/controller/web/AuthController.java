package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.anno.*;
import com.yunzainfo.education.entity.PageParam;
import com.yunzainfo.education.entity.auth.AuthEntity;
import com.yunzainfo.education.entity.auth.AuthParam;
import com.yunzainfo.education.entity.result.ResultData;
import com.yunzainfo.education.service.AuthService;
import com.yunzainfo.education.utils.HttpServletRequestUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * @author hww
 * @date 2020/10/8
 */
@Controller
@RequestMapping("/device-manage/api/manage/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * 帐号列表
     *
     * @param param 页面信息
     * @return
     */
    @PostMapping(path = "/list")
    public ResponseEntity<ResultData<Map<String, Object>>> listAuth(@RequestBody PageParam param) {
        Map<String, Object> map = authService.listAuth(param);
        return ResultData.okData(map);
    }

    /**
     * 新增/编辑帐号
     *
     * @param param 新增/编辑帐号对象
     * @return
     */
    @PostMapping(path = "/add")
    public ResponseEntity<ResultData<Object>> addAuth(@RequestBody @Validated(GroupA.class) AuthParam param) {
        authService.addAuth(param);
        return ResultData.okMessage("操作成功");
    }

    /**
     * 删除帐号
     *
     * @param param 多个账号用逗号隔开
     */
    @PostMapping(path = "/delete")
    public ResponseEntity<ResultData<Object>> deleteAuth(@RequestBody @Validated(GroupF.class) AuthParam param) {
        authService.deleteAuth(param.getIds());
        return ResultData.okMessage("删除成功");
    }

    /**
     * 搜索帐号
     *
     * @param param 搜索账号参数
     */
    @PostMapping(path = "/search")
    public ResponseEntity<ResultData<Map<String, Object>>> searchAuth(@RequestBody @Validated(GroupC.class) AuthParam param) {
        Map<String, Object> map = authService.selectAuth(param.getPage(), param.getSize(), param.getAccount(), param.getLevel());
        return ResultData.okData(map);
    }

    /**
     * 重置密码
     *
     * @param param 重置密码参数
     */
    @PostMapping(path = "/resetpwd")
    public ResponseEntity<ResultData<Object>> resetPassword(@RequestBody @Validated(GroupD.class) AuthParam param) {
        authService.updatePassword(param.getAccount(), param.getPassword());
        return ResultData.okMessage("重置密码成功");
    }

    /**
     * 锁定帐号
     *
     * @param param 锁定帐号参数
     */
    @PostMapping(path = "/lock")
    public ResponseEntity<ResultData<Object>> lockAuth(@RequestBody @Validated(GroupE.class) AuthParam param) {
        authService.updateLock(param.getAuthId(), param.getLock());
        if (param.getLock() == 0) {
            return ResultData.okMessage("解锁帐号成功");
        } else if (param.getLock() == 1) {
            return ResultData.okMessage("锁定帐号成功");
        } else {
            return ResultData.errorTip("Lock parameter error");
        }
    }

    /**
     * 根据Id查询账户信息
     *
     * @param param 账户id
     * @return
     */
    @PostMapping(path = "/findById")
    public ResponseEntity<ResultData<AuthEntity>> findById(@RequestBody @Validated(GroupG.class) AuthParam param) {
        AuthEntity authEntity = authService.findById(param);
        return ResultData.okData(authEntity);
    }

    /**
     * 获取当前用户信息
     *
     * @return
     */
    @GetMapping(path = "/info")
    public ResponseEntity<ResultData<AuthEntity>> authInfo() {
        AuthEntity auth = getAuthInfo();
        if (auth != null) {
            auth.setPassword("");
            return ResultData.okData(auth);
        } else {
            return ResultData.errorTip("Failed to get auth information");
        }
    }
    private AuthEntity getAuthInfo() {
        return HttpServletRequestUtils.getCurrentAuth();
    }
}
