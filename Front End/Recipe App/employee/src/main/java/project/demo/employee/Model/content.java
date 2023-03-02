package project.demo.employee.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class content implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long recipeid;
    private long contentid;
    @Column(length = 2048)
    private String maincontent;

public content(){}

public content(Long recipeid, Long contentid, String maincontent )
{
    this.recipeid = recipeid;
    this.contentid = contentid;
    this.maincontent = maincontent;
}

public Long getId()
{
    return id;
}

public void setId(Long id)
{
    this.id = id;
}

public Long getrecipeId()
{
    return recipeid;
}

public void setRecipeId(Long recipeid)
{
    this.recipeid = recipeid;
}

public long getContentid()
{
    return contentid;
}
public void setContentid(Long contentid)
{
    this.contentid = contentid;
}

public String getMaincontent()
{
    return maincontent;
}

public void setMaincontent(String maincontent)
{
    this.maincontent = maincontent;
}


}
