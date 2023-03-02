package project.demo.employee.Model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class recipe implements Serializable
{
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;
    private String title;
    private String author;
    private String description;
    private String category;
    private long rating;
    private long viewed;
    private float avgRating;
    private String imageUrl;
    private String cookTime;
    private String prepTime;
    private String servings;
    @Column(length = 2048)
    private String ingredientRaw;
    @Column(length = 2048)
    private String contentRaw;
    public recipe(){}

    public recipe(String title, String author, String description,String category,long rating,
                  long viewed,float avgRating,String imageUrl,String cookTime,String prepTime,String servings,
                  String ingredientRaw,String contentRaw)
    {
        this.title = title;
        this.author = author;
        this.description = description;
        this.category = category;
        this.rating = rating;
        this.viewed = viewed;
        this.imageUrl = imageUrl;
        this.cookTime = cookTime;
        this.prepTime = prepTime;
        this.servings = servings;
        this.avgRating = avgRating;
        this.ingredientRaw = ingredientRaw;
        this.contentRaw = contentRaw;
    }

   public long getId()
   {
       return id;
   }

   public void setId(long id)
   {
       this.id = id;
   }
   

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getAuthor()
    {
        return author;
    }

    public void setAuthor(String author)
    {
        this.author = author;
    }
    public String getDesc()
    {
        return description;
    }

    public void setDesc(String description)
    {
        this.description = description;
    }

    public String getCategory()
    {
        return category;
    }

    public void setCategory(String category)
    {
        this.category = category;
    }

    public long getRating()
    {
        return rating;
    }

    public void setRating(long rating)
    {
        this.rating = rating;
    }

    public long getView()
    {
        return viewed;
    }

    public void setView(long view)
    {
        this.viewed = view;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public String getCookTime()
    {
        return cookTime;
    }

    public void setCookTime(String cookTime)
    {
        this.cookTime = cookTime;
    }

    public String getPrepTime()
    {
       return prepTime;
    }

    public void setPrepTime(String prepTime)
    {
        this.prepTime = prepTime;
    }

    public String getServings()
    {
        return servings;
    }

    public void setServings(String servings)
    {
        this.servings = servings;
    }
    public float getavgRating(){
        return avgRating;
    }

    public void setavgRating(float avgRating)
    {
        this.avgRating = avgRating;
    }

    public String getIngredientRaw()
    {
         return ingredientRaw;
    }

    public void setIngredientRaw(String ingredientRaw)
    {
        this.ingredientRaw = ingredientRaw;
    }
    
   public String getContentRaw()
   {
       return contentRaw;
   }

   public void setContentRaw(String contentRaw)
   {
       this.contentRaw = contentRaw;
   }
}
