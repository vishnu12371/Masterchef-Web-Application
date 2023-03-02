import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { RecipeService } from '../home/recipeservice';
import { Ingredient } from './ingredient';
import { Recipe} from '../home/recipe';
import {UserEntry} from './userentry';
import { DomSanitizer } from "@angular/platform-browser";
import { UploadService } from '../addrecipe/uploadservice';

@Component(
           { selector: 'app-root',
             templateUrl: 'recipe.component.html',
             styleUrls: ['./recipe.component.css'] 
           }
          )
          
export class RecipeComponent implements OnInit {
    recipeid : any;
    comAuth : any;
    contents : any[];
    rating : number;
    view : number;
    ingredient: Ingredient[];
    userentry : any[];
    images : any[];
    video : any;
    videourl : string;
    ratingflag : number = 0;
    viewflag   : number = 0;
    commentcounter : number = -1; 
    userentrysize : number;  
    userRating : number ;
    
    public recipe  : Recipe;
    constructor( private router: ActivatedRoute,
                 private recipeservice: RecipeService,
                 private uploadService: UploadService) {}
        
    ngOnInit() : void 
    {
        this.recipeid = this.router.snapshot.paramMap.get('p1'); //recipe id
        this.comAuth = this.router.snapshot.paramMap.get('p2'); // 999(no login) or user(login)
        this.getRecipeid(this.recipeid);
    }  

    public getRecipeid(id: number,): void
    {
      this.recipeservice.GetRecipeid(id).subscribe(
      (response: any) =>{ console.log(response)
        if(this.comAuth == response.recipe.author) {this.comAuth};
        this.setvalue(response); 
    },(error: HttpErrorResponse) =>{alert(error.message)});
    }

    //Dynamic valus from each form fetched and updated here
    public setvalue(value: any): void
    {
       this.commentcounter = 0;
       this.recipe = value.recipe;
       this.rating = value.recipe.avgRating;
       this.view = value.recipe.view;
       this.ingredient = value.ingredient 
       this.contents = value.content;
       this.images = value.image;
       this.video = value.video;
       console.log(this.video.videoUrl);
       this.userentry = value.userentry;
       this.userentrysize = this.userentry.length;
    }

    public getRating(): any
    {
        if (this.ratingflag == 0){
          this.ratingflag = 1;
          if (this.recipe.rating== 0 || this.recipe.view == 0)
          {
            return 0;
          }
          else {return this.recipe.avgRating;}
        }
        else
        {
           this.commentcounter = this.commentcounter + 1;
           return this.userentry[this.commentcounter].rating;
        }
    }
    public getView() : any
    {
        if (this.viewflag == 0){
          this.viewflag = 1;
          return this.recipe.view
        }
        else
        {
           return null;
        }
    }

    public async onAddComment(form : NgForm) : Promise<void>
    {
      if (this.comAuth != "999"){
        if ( (form.value.comment == null) || (form.value.rating == null)) {alert("Please add comment/rating")}
        else
        {
       const user = {} as UserEntry;
       user.author = this.comAuth;
       var comment = form.value.comment;
       user.comments = comment;
       user.recipeid = this.recipe.id
       console.log(this.recipe.avgRating);
       user.rating =  form.value.rating;
       this.ratingflag = 0;
       let userentry = await this.uploadService.addUserEntry(user);
       console.log(userentry);
       this.recipe.view = this.recipe.view + 1;   //Add View Count +1
       this.recipe.rating = (this.recipe.rating + parseInt(form.value.rating) ) ;
       this.recipe.avgRating = this.recipe.rating/this.recipe.view;
       /*this.uploadService.uploadRecipe(this.recipe).subscribe(
        (response: any) =>{ console.log(response);
          this.setvalue(response); 
      },(error: HttpErrorResponse) =>{alert(error.message)}); */
      let newRec =  await this.uploadService.uploadRecipe(this.recipe);
      console.log(newRec);
      form.reset();
      this.getRecipeid(this.recipeid); 
  }
    }
    else {alert("Please Login/Create an Account to add comments!!");}
    }
}





