import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'; 
import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Recipe } from './recipe'
import { RecipeService } from './recipeservice';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css','./star.scss']
  })

export class HomeComponent  implements OnInit 
{
  counterview = -1;
  counterrating = -1;
  starWidth: number = 0;
  filter: string;
  value: string;
  recipeid = null;
  search: string;

public recipes : Recipe[];
constructor(private recipeservice: RecipeService,
            private router: Router) {};

  ngOnInit() 
  {
      this.filter = "1";
      this.value = "null";
      this.getRecipe(this.filter,this.value);
  }

  public getRecipe(filter: string,value: String): void
  {
    this.recipeservice.GetRecipe(filter,value).subscribe(
    (response: Recipe[] ) =>{this.recipes = response; console.log(response);},(error: HttpErrorResponse) =>{alert(error.message)});
  }

  //Return rating to rating Module
  public getRating() : any 
  {
     this.counterrating = this.counterrating + 1;
     if(this.recipes[this.counterrating].avgRating == null)
     {
       return 0;
     }
     else
     return this.recipes[this.counterrating].avgRating
  }

  public getView() : any 
  {
    this.counterview = this.counterview + 1;
    return this.recipes[this.counterview].view
  }

  public onclickid(id: number) : void
  {
    this.recipeid = id;
    this.router.navigate(['/recipe', this.recipeid,"999"]); //999 indicates search without login
  }

  public onRoute(search: string,value: string) : void
  {
     this.router.navigate(['/recipesearch',search,value]);
  }
/*
  public passRating(rating: number)
{
  this.currentRate = rating;
  console.log(this.currentRate);
}
public passViewed(viewed: number)
{
  this.currentViews = viewed;
  console.log(this.currentViews);
}
*/

}