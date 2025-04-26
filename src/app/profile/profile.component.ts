import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 profileImage : string = "https://i1.wp.com/en.support.files.wordpress.com/2008/12/update-profile-photo.png"

allUserDownloadList: any =[]
 constructor(private api : ApiService){}


 ngOnInit(){
  this.getUserDownloadRecipe()

  const user = JSON.parse(sessionStorage.getItem("user") || "")
  if(user.profilePic){
    this.profileImage = user.profilePic
  }
 }
 getUserDownloadRecipe(){
  this.api.getUserDownloadRecipeAPI().subscribe((res: any)=>{
    this.allUserDownloadList = res
    console.log(this.allUserDownloadList);
    
  })
 }

 getFile(event:any){
  let uploadFile = event.target.files[0]
   let fr = new FileReader
   fr.readAsDataURL(uploadFile)
   fr.onload= (event:any)=>{
    console.log(event.target.result);
    this.profileImage = event.target.result
    
   }
 }

 updateProfile(){
  this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
    sessionStorage.setItem("user", JSON.stringify(res))
    this.profileImage = res.profilePic
    alert(`Profile updated successfully`)
  })
 }
}
