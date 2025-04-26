import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean = false
  loggedUsername : string=""

  constructor(private router : Router){}

  ngOnInit(){
    if(sessionStorage.getItem('user')&& sessionStorage.getItem('token')){
      this.isLoggedIn = true
      this.loggedUsername = JSON.parse(sessionStorage.getItem("user")|| "").username
    }else{
      this.isLoggedIn = false
      this.loggedUsername = ""
    }
  }
   logout(){
    sessionStorage.clear()
    this.isLoggedIn = false
    this.loggedUsername = ""
    this.router.navigateByUrl('/')
   }
}
