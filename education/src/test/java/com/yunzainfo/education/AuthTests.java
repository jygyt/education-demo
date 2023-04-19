package com.yunzainfo.education;

import com.yunzainfo.education.service.AuthService;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * @author ngf
 * @date 2020/10/7
 */
@SpringBootTest
public class AuthTests {
    @Resource
    private AuthService authService;

    /**
     * 分页查询账户
     */
//    @Test
//    void listAuth() {
//        List<AuthEntity> authEntityList = authService.listAuth(1, 2);
//        System.out.println(authEntityList);
//    }

    /**
     * 新增/编辑帐号
     */
//    @Test
//    void addAuth() {
//        AuthParam authParam = new AuthParam();
//        authParam.setId("8272f347-4271-48e8-9a65-3e82c1937ac0");
//        authParam.setAccount("77");
//        authParam.setName("77");
//        authParam.setLevel(2);
//        authParam.setPassword("77");
//        authParam.setLock(0);
//        authParam.setStatusAuth(0);
//        /**
//         * 0新增，1编辑
//         */
//        authParam.setType(1);
//        String createAuthId = "7";
//        authService.addAuth(authParam, createAuthId);
//    }

    /**
     * 删除帐号
     */
//    @Test
//    void deleteAuth() {
//        String ids = "8272f347-4271-48e8-9a65-3e82c1937ac0,7b1da947-c4e6-453d-9904-d521874fbf93";
//        authService.deleteAuth(ids);
//    }

    /**
     * 搜索帐号
     */
//    @Test
//    void searchAuth() {
//        String account = "5";
//        Integer level = 1;
//        List<AuthEntity> authEntityList = authService.selectAuth(account, level, AuthUtils.currentUserId());
//        System.out.println(authEntityList);
//    }

    /**
     * 重置密码
     */
//    @Test
//    void resetPassword() {
//        String account = "";
//        String password = "9oo";
//        authService.updatePassword(param.getAccount(), account, password);
//    }

    /**
     * 锁定账户
     */
//    @Test
//    void lockAuth() {
//        String userId = "707a09dd-6364-480b-b7ab-6c49bbda7421";
//        Integer lock = 1;
//        authService.updateLock(userId, lock);
//    }
}
