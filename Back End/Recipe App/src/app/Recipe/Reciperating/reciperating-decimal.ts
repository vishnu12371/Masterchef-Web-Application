import {Component, OnInit} from '@angular/core';
import { RecipeComponent } from '../recipe.component'


@Component({
  selector: 'ngbd-recipe-rating-decimal',
  templateUrl: './reciperating-decimal.html',
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: red;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `]
})
export class NgbdRecipeRatingDecimal  implements OnInit {

 constructor(private recipe: RecipeComponent){}

  
 currentRate;
 currentViews;

 ngOnInit() : void 
 {
  this.currentRate = this.recipe.getRating();
  this.currentViews = this.recipe.getView();
 }

}
