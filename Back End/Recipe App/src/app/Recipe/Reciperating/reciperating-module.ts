import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdRecipeRatingDecimal } from './reciperating-decimal';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdRecipeRatingDecimal],
  exports: [NgbdRecipeRatingDecimal],
  bootstrap: [NgbdRecipeRatingDecimal]
})
export class NgbdRecipeRatingDecimalModule {}
