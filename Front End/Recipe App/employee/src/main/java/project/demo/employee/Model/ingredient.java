package project.demo.employee.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ingredient implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;
    private long recipeid;
    private long ingid;
    @Column(columnDefinition="LONGTEXT")
    private String content;

    public ingredient(){}

    public ingredient(long recipeid, long ingid, String content)
    {
        this.recipeid = recipeid;
        this.ingid = ingid;
        this.content = content;
    }

    public long getId()
    {
      return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public long getRecipeid()
    {
        return recipeid;
    }

    public void setRecipeid(long recipeid)
    {
        this.recipeid = recipeid;
    }

    public long getIngid()
    {
        return ingid;
    }

    public void setIngid(long ingid)
    {
        this.ingid = ingid;
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

}
