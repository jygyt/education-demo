package com.yunzainfo.education.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author ngf
 * @date 2020/10/9 1:45 下午
 */
@Data
@NoArgsConstructor
public class LoginParam {

    @NotBlank
    private String account;
    @NotBlank
    private String password;

    private Boolean sevenDays;
}
