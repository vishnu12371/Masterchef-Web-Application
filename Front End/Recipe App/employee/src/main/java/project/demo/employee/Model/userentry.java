package project.demo.employee.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class userentry implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;
    private long recipeid;
    private String author;
    private long rating;
    private String comments;

    public userentry(){}

    public userentry(long recipeid, String author, long rating, String comments)
    {
        this.recipeid = recipeid;
        this.author = author;
        this.rating = rating;
        this.comments = comments;
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public Long getRecipeid(){
        return recipeid;
    }

    public void setRecipeid(long recipeid){
        this.recipeid = recipeid;
    }

    public String getAuthor(){
        return author;
    }

    public void setAuthor(String author)
    {
        this.author = author;
    }

    public long getRating(){
        return rating;
    }

    public void setRating(long rating){
        this.rating = rating;
    }

    public String getComments(){
        return comments;
    }

    public void setComments(String comments){
        this.comments = comments;
    }

}
