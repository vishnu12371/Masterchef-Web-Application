import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { RecipeService } from '../home/recipeservice';
import { Recipe} from '../home/recipe'

@Component(
           { selector: 'app-root',
             templateUrl: 'recipesearch.component.html',
             styleUrls: ['./recipesearch.component.css'] 
           }
          )

export class RecipeSearchComponent implements OnInit 
{
    filter: string;
    value: string;
    user : string;
    login : string;
    search : string;
    public recipes : Recipe[];
    constructor(private recipeservice: RecipeService,
                private router: ActivatedRoute,
                private router1: Router) {};
                
    ngOnInit() : void
    {
      
        this.filter = this.router.snapshot.paramMap.get('p1');
       // this.value= this.router.snapshot.paramMap.get('p2');

        if(this.filter != "100") //not logged in
        {
        this.value= this.router.snapshot.paramMap.get('p2');
        this.getRecipe(this.filter,this.value);  
        this.user= "999";
        }
        else
        { //100 indicates navigation via login
          this.user = this.router.snapshot.paramMap.get('p2');
        }
    }

    public getRecipe(filter: string,value: String): void
  {
    this.recipeservice.GetRecipe(filter,value).subscribe(
    (response: Recipe[] ) =>{this.recipes = response; console.log(response);},(error: HttpErrorResponse) =>{alert(error.message)});
  }

  public onclickid(id: number) : void
  {
    this.router1.navigate(['/recipe', id,this.user]); //search without login
  }

  public onclicksearch() : void
  {
    if (this.search != null) 
    {
    this.value = this.search;
    this.recipeservice.GetRecipe("2",this.search).subscribe(
      (response: Recipe[] ) =>{this.recipes = response; console.log(response);},(error: HttpErrorResponse) =>{alert(error.message)});
    }
    }

}