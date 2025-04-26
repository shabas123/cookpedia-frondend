import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAllRecipiesAPI() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }


  // add testimony api
  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // api to register users
  userRegisterAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // api to login users
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // view a recipe
  viewRecipeAPI(recipeId: string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }


  //http://localhost:3000/related-recipes?cuisine=Italian
  relatedRecipeAPI(cuisine: any) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  downloadRecipeAPI(recipeId: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }
  //http://localhost:3000/recipe/67efba8a2e4cc2ffb07a30fe/save
  saveRecipeAPI(recipeId: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody, this.appendToken())
  }

  getUserSaveRecipeAPI() {
    return this.http.get(`${this.server_url}/get-save-recipes`, this.appendToken())
  }

  //delete saved recipe
  deleteSavedRecipeAPI(id: string) {
    return this.http.delete(`${this.server_url}/save-recipe/${id}/remove`, this.appendToken())
  }

  //get user download recipe
  getUserDownloadRecipeAPI() {
    return this.http.get(`${this.server_url}/get-download-recipes`, this.appendToken())
  }

  //edit user
  editUserAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/user/edit`, reqBody, this.appendToken())
  }

  //get all users
  getAllUsersAPI() {
    return this.http.get(`${this.server_url}/all-users`, this.appendToken())
  }

  getAllDownloadAPI() {
    return this.http.get(`${this.server_url}/download-list`, this.appendToken())
  }

  //get all feedback
  getAllFeedbackListAPI() {
    return this.http.get(`${this.server_url}/get-testimony`, this.appendToken())
  }

  //update feedback
  updateFeedbackListAPI(feedbackId: string, status: string) {
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`, this.appendToken())
  }

  //add recipe
  addRecipeAPI(reqBody: any){
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.appendToken())
  }

  //update recipe
  updateRecipeAPI  (id:string, reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/update`, reqBody, this.appendToken())
  }

    //deltw recipe
    deleteRecipeAPI(id:string){
      return this.http.delete(`${this.server_url}/recipe/${id}/remove`,  this.appendToken())
    }

    getChartData(){
      this.getAllDownloadAPI().subscribe((res:any)=>{
        let DownloadArrayList:any =[]
        let output : any ={}
  
        //input: [{recipeCuisine, count}]
        //output : [{name : cuisine, y : totalcount}]
  
        res.forEach((item:any)=>{
          let cuisine = item.recipeCuisine
          let currentCount = item.count
  
          if(output.hasOwnProperty(cuisine)){
             output[cuisine] += currentCount
          }else{
            output[cuisine] = currentCount
          }
        })
        console.log(output);
         for(let cuisine in output){
          DownloadArrayList.push({name : cuisine, y : output[cuisine]})
         }
        console.log(DownloadArrayList);
        localStorage.setItem("chart", JSON.stringify(DownloadArrayList))
      })
    }
}

