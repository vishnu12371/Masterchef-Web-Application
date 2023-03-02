import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {UploadService } from './uploadservice';
import * as AWS from 'aws-sdk';
import { Recipe } from '../home/recipe';
import { Content } from '../Recipe/content';
import { Ingredient } from '../Recipe/ingredient';
import { HttpErrorResponse } from '@angular/common/http';
import { Video } from './video';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

@Component(
           { 
               selector: 'addrecipe',
               templateUrl: 'addrecipe.component.html' ,
                styleUrls: ['./addrecipe.component.css']
           }
)


export class AddRecipeComponent  implements OnInit{
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
    recipe : Recipe;
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
    
    myForm = new FormGroup({
        file: new FormControl('', [Validators.required])
      });

      constructor(private uploadService: UploadService,
        private router: ActivatedRoute,
        private router1: Router){};
     
      ngOnInit(): void{
        this.author = this.router.snapshot.paramMap.get('p1');
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

  async submit() 
  {
   // document.getElementById('add-recipe-form').click();
    //addForm.reset();
    var countervalue = 0; 
    const recipe = {} as Recipe;
    
    var ingarray = new Array<Ingredient>();
    var contarray = new Array<Content>();
    var vidarray = new Array<Video>();
    var recipehead : Recipe ;

    // Update Recipe Details(Header)
    recipe.title = this.title;
    recipe.desc = this.desc;
    recipe.author = this.author;
    recipe.category = this.category;
    recipe.cookTime = this.cooktime;
    recipe.servings = this.servings;
    recipe.prepTime = this.preptime;
    recipe.ingredientRaw = this.rawingredient;
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

    let  recipeheader = await this.uploadService.addRecipeheader(recipe);
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
    
     alert("Recipe Added Succesfully");

  }
}

