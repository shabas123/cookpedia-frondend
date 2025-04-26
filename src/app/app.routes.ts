import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './gurd/auth.guard';

export const routes: Routes = [

    {
        path : "admin", loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
   // http://localhost:4200/
    {
        path:"", component:HomeComponent , title:"Home Page"
    },
     // http://localhost:4200/
     {
        path:"about", component:AboutComponent , title:"About Page"
    },
     // http://localhost:4200/
     {
        path:"contact", component:ContactComponent , title:"Contact Page"
    },
     // http://localhost:4200/
     {
        path:"login", component:LoginComponent , title:"Login Page"
    },
     // http://localhost:4200/
     {
        path:"register", component:RegisterComponent , title:"Register Page"
    },
     // http://localhost:4200/
     {
        path:"all-recipes", component:RecipesComponent , title:"All Recipes Page"
    },
     // http://localhost:4200/
     {
        path:"profile", canActivate:[authGuard], component:ProfileComponent , title:"Profile Page"
    },
     // http://localhost:4200/
     {
        path:"saved-recipe", canActivate:[authGuard], component:SavedRecipesComponent , title:"Saved-Recipe Page"
    },
     // http://localhost:4200/
     {
        path:"recipe/:id/view", canActivate:[authGuard], component:ViewRecipesComponent , title:"View Recipe"
    },
     // http://localhost:4200/
     {
        path:"**", component:PageNotFoundComponent , title:"Page Not Found"
    },
];
