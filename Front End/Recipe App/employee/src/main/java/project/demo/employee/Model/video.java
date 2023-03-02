package project.demo.employee.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class video 
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private long recipeid;
    private String videourl;

    public video(){}

    public video(long recipeid, String videourl)
    {
        this.recipeid = recipeid;
        this.videourl = videourl;
    }


    public long getRecipeid(){
        return recipeid;
    }

    public void setRecipeid(long recipeid)
    {
        this.recipeid = recipeid;
    }

   public String getVideoUrl()
   {
       return videourl;
   }

   public void setVideoUrl(String videourl)
   {
     this.videourl = videourl;
   }
    
}
