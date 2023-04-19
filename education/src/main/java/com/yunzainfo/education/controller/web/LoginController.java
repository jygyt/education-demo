package com.yunzainfo.education.controller.web;

import com.yunzainfo.education.dao.repository.AuthRepository;
import com.yunzainfo.education.dao.table.Auth;
import com.yunzainfo.education.entity.LoginParam;
import com.yunzainfo.education.entity.result.ResultData;
import com.yunzainfo.education.service.TokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ngf
 * @date 2020/10/9 1:41 下午
 */
@Controller
@RequestMapping("/device-manage/api/manage/login")
public class LoginController {

    private final AuthRepository authRepository;
    private final TokenService tokenService;

    public LoginController(AuthRepository authRepository,
                          TokenService tokenService) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated LoginParam loginParam) {
        Auth auth = authRepository.findByAccount(loginParam.getAccount());
        if (auth == null || !auth.getPassword().equals(loginParam.getPassword()) || auth.getStatusAuth() == 1) {
            return ResultData.errorTip("账户不存在或密码错误！");
        }
        if (auth.getLock() == 1) {
            return ResultData.errorTip("账户被锁定,请联系管理员！");
        }
        String token;
        if (loginParam.getSevenDays() != null && loginParam.getSevenDays()) {
            // 7天有效的Token
            token = tokenService.creatToken(auth.getId(), 604800);
        } else {
            token = tokenService.creatToken(auth.getId());
        }

        Map<String, Object> result = new HashMap<>();
        //Map<String, Object> result = new HashMap<>();
        result.put("token", token);

        return ResultData.okData(result);
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String accessTokenBase64 = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (accessTokenBase64 != null) {
            tokenService.invalidate(accessTokenBase64);
            return ResultData.okMessage("退出登录成功！");
        } else {
            return ResultData.errorTip("token已失效！");
        }
    }
}
