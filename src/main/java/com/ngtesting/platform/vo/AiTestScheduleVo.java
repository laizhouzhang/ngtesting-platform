package com.ngtesting.platform.vo;

import javax.persistence.Column;

public class AiTestScheduleVo extends BaseVo {
    private static final long serialVersionUID = 453949027463017421L;
    private String name;

	@Column(name = "descr", length = 1000)
    private String descr;

    private Integer displayOrder;

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

}
