import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { loginservice } from './Login/login.service';
import { NgModule } from '@angular/core';
import {NgbdRatingDecimalModule} from './rating-module'
import {NgbdRecipeRatingDecimalModule} from './Recipe/Reciperating/reciperating-module';
import { SafePipe } from './safe.pipe'
import { DomSanitizer } from "@angular/platform-browser";



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbdRatingDecimalModule,
    NgbdRecipeRatingDecimalModule
  ], 
  declarations: [
    AppComponent,
    routingComponents,
    SafePipe
  ],
  providers: [EmployeeService,loginservice,],
  bootstrap: [AppComponent,NgbdRatingDecimalModule,NgbdRecipeRatingDecimalModule]
})
export class AppModule { }
