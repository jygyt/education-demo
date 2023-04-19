package com.yunzainfo.education.entity.auth;

import com.yunzainfo.education.anno.*;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author ngf
 * @date 2020/10/7
 */
@Data
public class AuthParam {
    @NotBlank(groups = {GroupB.class})
    private String id;
    @NotBlank(groups = {GroupE.class, GroupG.class})
    private String authId;
    @NotBlank(groups = {GroupF.class})
    private String ids;
    @NotBlank(groups = {GroupA.class, GroupB.class, GroupD.class})
    private String account;
    @NotBlank(groups = {GroupB.class, GroupD.class})
    private String password;
    /**
     * 0新增，1编辑
     */
    @NotNull(groups = {GroupA.class, GroupB.class})
    private Integer type;
    @NotNull(groups = {GroupA.class, GroupB.class})
    private Integer level;
    @NotNull(groups = {GroupE.class})
    private Integer lock;
    @NotNull(groups = {GroupC.class})
    @Min(1)
    private Integer page;
    @NotNull(groups = {GroupC.class})
    @Range(min = 1, max = 100)
    private Integer size;
}
