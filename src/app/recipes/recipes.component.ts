import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipies:any = []
  dummyAllRecipes:any=[]
  cuisineArray:any = []
  mealTypeArray : any = []
  searchKey :string=''
  p: number = 1;

  constructor(private api : ApiService, private router:Router

  ){}


  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipiesAPI().subscribe((res:any)=>{
      this.allRecipies = res
      console.log(this.allRecipies);

      // cuisine
      this.allRecipies.forEach((item:any) =>  {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        
      });
      console.log(this.cuisineArray);
      this.dummyAllRecipes = this.allRecipies
      

      // meal type 
      const dummyMeals = this.allRecipies.map((item:any)=> item.mealType)
      const flatArray = dummyMeals.flat(Infinity)
      console.log(flatArray);
      
      flatArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
      
      
    })
  }

  filterAllRecipes(key:string, value:string){
  this.allRecipies =  this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))

  }
  viewRecipe(recipeId : string){
    if(sessionStorage.getItem("token")){
     this.router.navigateByUrl(`recipe/${recipeId}/view`)
    }

  }
}