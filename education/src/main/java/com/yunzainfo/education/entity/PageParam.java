package com.yunzainfo.education.entity;

import lombok.Data;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * @author hww
 * @date 2020/6/1
 */
@Data
public class PageParam {
    @NotNull
    @Min(1)
    public Integer page;
    @NotNull
    @Range(min = 1, max = 100)
    public Integer size;

    public Integer getMysqlStart() {
        return (page - 1) * size;
    }

    public Integer getMysqlLimit() {
        return size;
    }

    public Integer getOracleStart() {
        return (page - 1) * size;
    }

    public Integer getOracleEnd() {
        return page * size;
    }

    public PageRequest getPageRequest() {
        return getPageRequestBySort(Sort.unsorted());
    }

    public PageRequest getPageRequestBySort(Sort sort) {
        // PageRequest 中的page是从 0  开始计数
        return PageRequest.of(page - 1, size, sort);
    }
}
