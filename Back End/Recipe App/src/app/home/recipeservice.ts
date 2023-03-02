import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  
export class RecipeService 
{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

   //Get All Recipe 
   public GetRecipe(filter: string,value: String): Observable<Recipe[]>
   {
     return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipe/getheader/${filter}/${value}`);
   }

   public GetRecipeid(id: number): Observable<any>
   {
       return this.http.get<any>(`${this.apiServerUrl}/recipe/getid/${id}`);
   }


   public GetRecipebyAuthor(author : String): Observable<Recipe[]>
   {
     return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipe/getauthor/${author}`);
   }


}