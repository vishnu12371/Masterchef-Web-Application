package project.demo.employee;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.demo.employee.Model.recipe;
import project.demo.employee.Model.ingredient;
import project.demo.employee.Model.content;
import project.demo.employee.Model.image;
import project.demo.employee.Model.video;
import project.demo.employee.Model.userentry;
import project.demo.employee.Vo.ReceipeResponseVO;

import project.demo.employee.service.EmployeeService;
import project.demo.employee.service.RecipeService;


@RestController
@RequestMapping("/recipe")
public class RecipeResource
{
    private final RecipeService recipeService;


    public RecipeResource(RecipeService recipeService)
    {
        this.recipeService = recipeService;
    }

//----Get All Recipe Details-----//
@GetMapping(value = "/getheader/{filter}/{value}")
public ResponseEntity<List<recipe>> getRecipe(@PathVariable("filter") Long filter,@PathVariable("value") String value)
{
   List<recipe> recipes =  this.recipeService.getAllRecipe(filter,value);
   return new ResponseEntity<>(recipes,HttpStatus.OK);
}

//---Get Recipe by Id
@GetMapping(value = "/getid/{id}")
public ResponseEntity <ReceipeResponseVO> getRecipeId(@PathVariable("id") Long id)
{  
   recipe Newrecipe =  this.recipeService.getRecipeHead(id);
   Long Recid = Newrecipe.getId();  //Get RecipeId 
   ReceipeResponseVO newr = new ReceipeResponseVO();  //Update object for return
   if(Recid != null)
   {
   List<ingredient> NewIng =  this.recipeService.getRecipeIng(Recid); //Get Ingredient List
   List<content> NewCon =  this.recipeService.getRecipeCon(Recid);  //Get Content List
   List<userentry> UserEntry = this.recipeService.getRecipeUserEntry(Recid);
   List<image> newImage = this.recipeService.getRecipeImages(Recid);
   video newvideo = this.recipeService.getRecipeVideos(Recid);
   newr.setRecipe(Newrecipe);
   newr.setingredient(NewIng);
   newr.setContent(NewCon);
   newr.setUserentry(UserEntry);
   newr.setImage(newImage);
   newr.setVideo(newvideo);
   return new ResponseEntity<>(newr,HttpStatus.OK);
   }
   else
    {
       return new ResponseEntity<>(newr,HttpStatus.BAD_REQUEST);
    }
}

//--Get Recipe by Author
@GetMapping(value = "/getauthor/{author}")
public ResponseEntity <List<recipe>> getRecipeByAuthor(@PathVariable("author") String author)
{
   List<recipe> newRec = this.recipeService.getRecipeByAuthor(author);
   return new ResponseEntity<>(newRec,HttpStatus.OK);
}



//-----Add Recipe Details----//
//Header

@PostMapping(value = "/addheader")
public ResponseEntity<recipe> addRec(@RequestBody recipe recipe)
//public ResponseEntity<recipe> addRecipe(@RequestBody recipe recipe)
{
    recipe Newrecipe = recipeService.addRecipe(recipe);
    return new ResponseEntity<>(Newrecipe,HttpStatus.OK);
}

//Ingredient
@PostMapping(value = "/addIngr")
public ResponseEntity<List<ingredient>> AddIng(@RequestBody List<ingredient> Ingredients)
//public ResponseEntity<recipe> addRecipe(@RequestBody recipe recipe)
{
    List<ingredient> Newingredients = recipeService.addIng(Ingredients);
    return new ResponseEntity<>(Newingredients,HttpStatus.OK);
    
}
//Content
@PostMapping(value = "/addCont")
public ResponseEntity<List<content>> addContent(@RequestBody List<content> contents)
//public ResponseEntity<recipe> addRecipe(@RequestBody recipe recipe)
{
    List<content> Newcontents = recipeService.addContent(contents);
    return new ResponseEntity<>(Newcontents,HttpStatus.OK);
}
//Add Video
@PostMapping(value = "/addvideo")
public ResponseEntity<video> addVideo(@RequestBody video video)
//public ResponseEntity<recipe> addRecipe(@RequestBody recipe recipe)
{
    video Newvideo = recipeService.addVideo(video);
    return new ResponseEntity<>(Newvideo,HttpStatus.OK);
}

//Add Image
@PostMapping(value = "/addimage/{upd}")
public ResponseEntity<image> addVideo(@RequestBody image image,@PathVariable long upd)
//public ResponseEntity<recipe> addRecipe(@RequestBody recipe recipe)
{
    image Newimage = recipeService.addImage(image,upd);
    return new ResponseEntity<>(Newimage,HttpStatus.OK);
}
//Comments/Rating
@PostMapping(value = "/adduserentry")
public ResponseEntity<userentry> addUserEntry(@RequestBody userentry userentry)
{
    userentry Newuserentry = recipeService.addUserEntry(userentry);
    return new ResponseEntity<>(Newuserentry,HttpStatus.OK);
}

//Update
@PutMapping(value = "/updaterec")
public ResponseEntity<recipe> updateRec(@RequestBody recipe recipe)
{
    recipe rec = recipeService.UpdateRecipe(recipe);
    return new ResponseEntity<>(rec,HttpStatus.OK);
}

@DeleteMapping(value = "/deleterecipe/{id}/{flag}")
public ResponseEntity<?> deleteRecipes(@PathVariable Long id,@PathVariable Long flag)
{
    recipeService.deleteRecipeDetails(id,flag);
    return new ResponseEntity<>(HttpStatus.OK);
}

}