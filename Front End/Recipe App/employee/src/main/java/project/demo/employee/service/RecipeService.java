package project.demo.employee.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import project.demo.employee.Repo.ContentRepo;
import project.demo.employee.Repo.ImageRepo;
import project.demo.employee.Repo.IngredientRepo;
import project.demo.employee.Repo.RecipeRepo;
import project.demo.employee.Repo.UserentryRepo;
import project.demo.employee.Repo.VideoRepo;
import project.demo.employee.Model.recipe;
import project.demo.employee.Model.userentry;
import project.demo.employee.Model.video;
import project.demo.employee.Model.ingredient;
import project.demo.employee.Model.content;
import project.demo.employee.Model.image;

@Service
public class RecipeService 
{
    private  RecipeRepo reciperepo;
    private  IngredientRepo ingredientrepo;
    private  ContentRepo contentrepo;
    private VideoRepo videorepo;
    private  UserentryRepo userentryrepo;
    private ImageRepo imagerepo;
    public   recipe recipe;
    public   ingredient ingredient;
    public   content content;

    @Autowired
    public RecipeService(ContentRepo contentrepo,IngredientRepo ingredientrepo,RecipeRepo reciperepo,UserentryRepo userentryrepo, VideoRepo videorepo, ImageRepo imagerepo)
    {
        this.contentrepo = contentrepo;
        this.ingredientrepo = ingredientrepo;
        this.reciperepo = reciperepo;
        this.userentryrepo = userentryrepo;
        this.videorepo = videorepo;
        this.imagerepo = imagerepo;
    }

//Get All Recipe Details
public List<recipe> getAllRecipe(Long filter,String value)
{
// Filter value -> 1(top6 viewed),2(by title),3(by author),4(category)
if      (filter == 1) { return reciperepo.findTopView();      }
else if (filter == 2) { return reciperepo.findTitle(value);   }
else if (filter == 3) { return reciperepo.findAuthor(value);  }
else if (filter == 4) { return reciperepo.findCateg(value);   }
else if (filter == 5) { return reciperepo.findAll();          }
else                  { return null;                          }
}

//Get For Individial 
public recipe getRecipeHead(Long recid)
{
     return reciperepo.findHeadById(recid);
}


public List<ingredient> getRecipeIng(Long recid)
{
     return ingredientrepo.findIngById(recid);
}
public List<content> getRecipeCon(Long recid)
{
     return contentrepo.findConById(recid);
}
public List<userentry> getRecipeUserEntry(Long recid) {
    return userentryrepo.findUserentryById(recid);
}
//Get by Author Name
public List<recipe> getRecipeByAuthor(String author)
{
    return reciperepo.findByAuthor(author);
}
public video getRecipeVideos(Long recid) {
    return videorepo.findById(recid);
}

public List<image> getRecipeImages(Long recid) {
    return imagerepo.findById(recid);
}


//======Post Recipe Details=======////
//RecipeHeader
public recipe addRecipe(recipe recipe)
//public recipe addRecipe(recipe recipe)
{
   return reciperepo.save(recipe);
}


//RecipeIngredient
public List<ingredient> addIng(List<ingredient> ingredients)
{
    List<ingredient> ingreds = new ArrayList<ingredient>();
    for( int i = 0; i < ingredients.size(); i++ )
    {
        ingreds.add(ingredientrepo.save(ingredients.get(i)));
    }
    return ingreds;
}

//RecipeContention
public List<content> addContent(List<content> contents)
{
    List<content> content = new ArrayList<content>();
    for( int i = 0; i < contents.size(); i++ )
    {
       
        content.add(contentrepo.save(contents.get(i)));
    }
    return content;
}

public video addVideo(video video) {
    return videorepo.save(video);
}

public image addImage(image image,Long upd) {
    if( upd == 0)
    {
    String img_url = image.getImageUrl();
    Long rec_id = image.getRecipeid();

     reciperepo.UpdateRecipeimage(img_url,rec_id);
    }
    return imagerepo.save(image);
}


public userentry addUserEntry(userentry userentry)
{
    return userentryrepo.save(userentry);
}

public recipe UpdateRecipe(recipe newRecipe)
{
    return reciperepo.save(newRecipe);
}

//RecipeIngredient
public List<ingredient> updateIng(List<ingredient> ingredients)
{
    List<ingredient> ingreds = new ArrayList<ingredient>();
    for( int i = 0; i < ingredients.size(); i++ )
    {
        ingreds.add(ingredientrepo.save(ingredients.get(i)));
    }
    return ingreds;
}

//RecipeContent
public List<content> updateContent(List<content> contents)
{
    List<content> content = new ArrayList<content>();
    for( int i = 0; i < contents.size(); i++ )
    {
        content.add(contentrepo.save(contents.get(i)));
    }
    return content;
}

//image
public video updateVideo(video video)
{
    return videorepo.save(video);
}


//Delete Recipe Details
public void deleteRecipeDetails(Long id,Long flag)
{
    imagerepo.deleteRecipeById(id);
    videorepo.deleteRecipeById(id);
    ingredientrepo.deleteRecipeById(id);
    contentrepo.deleteRecipeById(id);
    userentryrepo.deleteRecipeById(id);
    if (flag == 1)
    {
    reciperepo.deleteRecipeById(id);
    }
}


}