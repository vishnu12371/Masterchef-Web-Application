package project.demo.employee.Vo;


import java.util.List;

import project.demo.employee.Model.content;
import project.demo.employee.Model.ingredient;
import project.demo.employee.Model.recipe;
import project.demo.employee.Model.image;
import project.demo.employee.Model.video;
import project.demo.employee.Model.userentry;

public class ReceipeResponseVO 
{
   private recipe recipe;
   private List<ingredient> ingredient;
   private List<content> content;
   private List<userentry> userentry;
   private List<image> image;
   private video video;

public ReceipeResponseVO(){}

public ReceipeResponseVO(recipe recipe, List<ingredient> ingredient, List<content> content, List<userentry> userentry,
                         List<image> image, video video)
{
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.content = content;
    this.image = image;
    this.video = video;
    this.userentry = userentry;
}

public recipe getRecipe(){
    return recipe;
}

public void setRecipe(recipe recipe){
    this.recipe = recipe;
}

public List<ingredient> getIngredient(){
    return ingredient;
}

public void setingredient(List<ingredient> ingredient)
{
    this.ingredient = ingredient;
}

public List<content> getContent(){
    return content;
}

public void setContent(List<content> content){
    this.content = content;
}

public List<userentry> getUserentry(){
    return userentry;
}

public void setUserentry(List<userentry> userentry)
{
    this.userentry = userentry;
}

public List<image> getImage(){
    return image;
}

public void setImage(List<image> image)
{
    this.image = image;
}

public video getVideo()
{
    return video;
}

public void setVideo(video video)
{
    this.video = video;
}

}
