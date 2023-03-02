export interface Recipe
{
    id : number;
    title : string;
    author : string
    desc : string;
    category : string;
    view : number;
    rating : number; 
    imageUrl : string;
    cookTime : number;
    prepTime : number;
    servings : number;
    avgRating : number;
    ingredientRaw : string;
    contentRaw : string;
}