import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  allRecipes: any =[]

  constructor(private api: ApiService){}

  searchRecipe : string = ""

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){

    this.api.getAllRecipiesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }
  removeRecipe(id:string){
    this.api.deleteRecipeAPI(id).subscribe((res:any)=>{
      alert(`Recipe Deleted Successfully`)
      this.getAllRecipes()

    })

  }
}
