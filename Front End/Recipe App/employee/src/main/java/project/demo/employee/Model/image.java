package project.demo.employee.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class image {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private long recipeid;
    private String imageurl;

    public image(){}

    public image(long recipeid, String imageurl)
    {
        this.recipeid = recipeid;
        this.imageurl = imageurl;
    }


    public long getRecipeid()
    {
        return recipeid;
    }

    public void setRecipeid(long recipeid)
    {
        this.recipeid = recipeid;
    }

   public String getImageUrl()
   {
       return imageurl;
   }

   public void setImageUrl(String imageurl)
   {
     this.imageurl = imageurl;
   }
    
}
