import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {UploadService } from '../addrecipe/uploadservice';
import * as AWS from 'aws-sdk';
import { Recipe } from '../home/recipe';
import { Content } from '../Recipe/content';
import { Ingredient } from '../Recipe/ingredient';
import { HttpErrorResponse } from '@angular/common/http';
import { Video } from '../addrecipe/video';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { RecipeService } from '../home/recipeservice';
import { threadId } from 'worker_threads';

@Component(
           { 
               selector: 'editrecipe',
               templateUrl: 'editrecipe.component.html' ,
                styleUrls: ['./editrecipe.component.css']
           })

export class EditRecipeComponent implements OnInit
{
  recipeid : any;
  //Recipe Header
  title : string;
  author : string
  contents : string;
  desc : string;
  category : string;
  cooktime : number;
  preptime : number;
  servings : number; 
  url : string;
  headflag : boolean = false;
countervalue : number = 1;
//Ingredient
rawingredient : string;
public ingredient : Ingredient[];
//MainContent
rawcontent : string
public content : Content;
//Upload Video,Images
myFilesimage:string [] = [];
myFilesvideo:string [] = [];
public recipe : Recipe;

myForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  constructor( private router: ActivatedRoute,
               private router1 : Router,
               private recipeservice : RecipeService,
               private uploadService: UploadService) {}

    ngOnInit(): void
    { 
        this.recipeid = this.router.snapshot.paramMap.get('p1');
        this.getRecipeid(this.recipeid);
    }

    get f(){
        return this.myForm.controls;
      }

      //Video Catch
    onFileChange(event:any) {
        for (var i = 0; i < event.target.files.length; i++) { 
            this.myFilesimage.push(event.target.files[i]);
        }
       }
       //imageCatch
     onFileChange1(event:any) {
            for (var i = 0; i < event.target.files.length; i++) { 
                this.myFilesvideo.push(event.target.files[i]);
            }
        }



    public getRecipeid(id: number): void
    {
      this.recipeservice.GetRecipeid(id).subscribe(
      (response: any) =>{ console.log(response)
       this.setvalue(response); 
    },(error: HttpErrorResponse) =>{alert(error.message)});
    }

    //Dynamic valus from each form fetched and updated here
    public setvalue(value: any): void
    {
       this.recipe = value.recipe;
    }

    public onUpdateRecipe(editForm : any ) : void
    {
      console.log(editForm);
      this.title = editForm.recipeName;
      this.desc = editForm.desc;
      this.category = editForm.category;
      this.cooktime = editForm.cookTime;
      this.servings = editForm.servings;
      this.preptime = editForm.prepTime;
      this.servings = editForm.servings;
      this.rawingredient= editForm.ingredientRaw;
      this.rawcontent = editForm.contentRaw;
      this.submit();

    }

    async submit()
  {
    var countervalue = 0; 
    const recipe = {} as Recipe;
    
    var ingarray = new Array<Ingredient>();
    var contarray = new Array<Content>();
    var vidarray = new Array<Video>();
    var recipehead : Recipe ;

    // Update Recipe Details(Header)
    recipe.id = this.recipeid;
    recipe.title = this.title;
    recipe.desc = this.desc;
    recipe.author = this.recipe.author;
    recipe.rating = this.recipe.rating;
    recipe.view = this.recipe.view;
    recipe.avgRating = this.recipe.avgRating;
    recipe.category = this.category;
    recipe.cookTime = this.cooktime;
    recipe.servings = this.servings;
    recipe.prepTime = this.preptime;
    recipe.ingredientRaw = this.rawingredient
    recipe.contentRaw = this.rawcontent;


    try {
        var ingredientObj = JSON.parse(this.rawingredient);
      } catch (error: any) {
        // we'll proceed, but let's report it
        alert("Please check Ingredient format")
        return;
      }


      try {
        var contObj = JSON.parse(this.rawcontent);
      } catch (error: any) {
        // we'll proceed, but let's report it
        alert("Please check Step format")
        return;
      }

   
    let  recipeheader = await this.uploadService.uploadRecipe(recipe);
    this.delete(recipe.id); //delete ingredient,contents,image,video of the original and updates with new
    console.log(recipeheader);

    // If head update succesfull update ingredients 
    if (recipeheader.id != null ) 
    {
    
    recipe.ingredientRaw = this.rawingredient;
    //Update Recipe Ingredients
    for(var i = 0; i < ingredientObj.length; i++) 
    {
        const ingredients = {} as Ingredient;
        ingredients.recipeid = recipeheader.id;
        ingredients.ingid = (i+1);
        this.contents = ingredientObj[i].ingredient;
        ingredients.content = this.contents;
        console.log(ingredientObj[i].value);
        ingarray.push(ingredients);
        this.countervalue = countervalue + 1;
    }
    this.uploadService.addRecipeIngredients(ingarray).subscribe(
        (response: Ingredient[]) => { 
            console.log(response); 
            this.headflag = true;
        },
        (error: HttpErrorResponse) => {alert(error.message)});

    countervalue = 0; //reset counter

    //Update Recipe Contents
    for(var i = 0; i < contObj.length; i++) 
    {
        const contents = {} as Content;
        contents.recipeId = recipeheader.id;
        contents.contentid = (i+1);
        this.contents = contObj[i].step;
        contents.maincontent = this.contents;
        console.log(ingredientObj[i].value);
        contarray.push(contents);
        this.countervalue = countervalue + 1;
    }
    this.uploadService.addRecipeContents(contarray).subscribe(
        (response: Content[]) => { 
            console.log(response); 
            this.headflag = true;
        },
        (error: HttpErrorResponse) => {alert(error.message)});

    }
      
    //final = 1 ( Upload Video )
    for (var i = 0; i < this.myFilesvideo.length; i++)
     { 
      const video = {} as Video;
      const file = this.myFilesvideo[i];
      var url =  this.uploadService.fileUpload(file,1,100,recipeheader.id); 
      console.log("file uploaded here" + url);
      
    }
    //final = 2 ( Upload Image)
    for (var i = 0; i < this.myFilesimage.length; i++) 
    { 
        const file = this.myFilesimage[i];
        this.uploadService.fileUpload(file,2,i,recipeheader.id); 
     }
    
     alert("Recipe Updated Succesfully");

  
  }

  public delete(id: number) : void
               {
                this.uploadService.deleteRecipe(id,999).subscribe(
                  (
                    response: void) => { console.log(response);},
                    (error: HttpErrorResponse) => {alert(error.message)});
               }

}
