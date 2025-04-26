import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

   recipeId : string = ""
   recipe: any = []
   allRelatedRecipes : any =[]
  constructor(private route: ActivatedRoute, private api : ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
    this.recipeId = res.id
    console.log(this.recipeId);
    this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails(recipeId :any){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
    this.recipe = res
    console.log(this.recipe);
    this.getAllRelatedRecipes(res.cuisine)
    
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length > 1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
      }else{
        this.allRelatedRecipes = []
      }
    
      console.log(this.allRelatedRecipes);
      
    })
  }
  //download recipe
  downloadRecipe(){
    this.api.downloadRecipeAPI(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      //get chart data
      this.generatePDF()
    })
  }
  //GenaratePDF
  generatePDF(){
    const pdf = new jspdf()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.Servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Prepration Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriePerServing}`,10,45)
    let head = [[`Ingredients Needed`, `Cooking Instructions`]]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output(`dataurlnewwindow`)
    pdf.save(`download-recipe.pdf`)
  }

  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId, this.recipe).subscribe({
      next:(res:any)=>{
        alert(`Recipe added to your collection`)
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
}
