package cn.linkr.testspace.vo;

import java.util.LinkedHashSet;

public class TestProjectVo extends BaseVo {
	private static final long serialVersionUID = -9069520320732281911L;
	private String name;
    private String descr;
    private Long companyId;
    private Boolean isActive;
    
    private Long parentId;
    
    private Integer depth;
    private Integer childrenNumb = 0;
    
    LinkedHashSet<TestProjectVo> children = new LinkedHashSet<TestProjectVo>();
    
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
	public Long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Integer getDepth() {
		return depth;
	}
	public void setDepth(Integer depth) {
		this.depth = depth;
	}

	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public LinkedHashSet<TestProjectVo> getChildren() {
		return children;
	}
	public void setChildren(LinkedHashSet<TestProjectVo> children) {
		this.children = children;
	}
	public Integer getChildrenNumb() {
		return childrenNumb;
	}
	public void setChildrenNumb(Integer childrenNumb) {
		this.childrenNumb = childrenNumb;
	}

}