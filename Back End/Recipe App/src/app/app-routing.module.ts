import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './Login';
import { RegisterComponent } from './Register';
import { EmployeeManagerComponent } from './employeemanager';
import { RecipeComponent } from './Recipe/recipe.component';
import { RecipeSearchComponent } from './recipesearch/recipesearch.component';
import { AddRecipeComponent } from './addrecipe/addrecipe.component';
import { UserRecipecomponent} from './userRecipe/useRecipe.component'
import { EditRecipeComponent } from './editrecipe/editrecipe.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register/:p1', component: RegisterComponent },
    { path: 'employeemanager', component: EmployeeManagerComponent },
    { path: 'recipesearch/:p1/:p2', component: RecipeSearchComponent },
    { path: 'recipe/:p1/:p2', component: RecipeComponent },
    { path: 'addrecipe/:p1', component: AddRecipeComponent },
    { path: 'useRecipe/:p1', component: UserRecipecomponent },
    { path: 'editRecipe/:p1', component: EditRecipeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent,EmployeeManagerComponent,RecipeComponent,
                                  RecipeSearchComponent,AddRecipeComponent, UserRecipecomponent,EditRecipeComponent]
