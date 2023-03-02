import { HttpErrorResponse } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { RecipeService } from '../home/recipeservice';
import { Recipe} from '../home/recipe';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
import { Validators } from '@angular/forms';
import { UploadService } from '../addrecipe/uploadservice';


@Component(
           { selector: 'app-root',
             templateUrl: 'userRecipe.component.html',
             styleUrls: ['./userRecipe.component.css'] 
           }
          )
          
export class UserRecipecomponent implements OnInit {

  counterview = -1;
  counterrating = -1;
  starWidth: number = 0;
  filter: string;
  value: string;
  recipeid = null;
  author : string;
  newr : number = 2;

  public recipes : Recipe[];
  constructor( private router: ActivatedRoute,
               private router1 : Router,
               private recipeservice: RecipeService,
               private uploadService: UploadService) {}

               ngOnInit() 
               {
                   this.author = this.router.snapshot.paramMap.get('p1');
                   this.getRecipe(this.author);
               }

               public getRecipe(author : string): void
               {
                 this.recipeservice.GetRecipebyAuthor(author).subscribe(
                 (response: Recipe[] ) =>{this.recipes = response; console.log(response);},(error: HttpErrorResponse) =>{alert(error.message)});
               }

               public onclickdelid(id: number) : void
               {
                this.uploadService.deleteRecipe(id,1).subscribe(
                  (
                    response: void) => { console.log(response); 
                    this.getRecipe(this.author);},
                    (error: HttpErrorResponse) => {alert(error.message)});
               }

               public onclickid(id: number) : void
               {
                 this.recipeid = id;
                 this.router1.navigate(['/recipe', this.recipeid,this.author]);
               }

               public onclickeditid(id: number) : void
               {
                this.router1.navigate(['/editRecipe', id]);
               }


}