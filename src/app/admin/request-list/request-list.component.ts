import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
    allFeedbacks:any =[]
  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllFeedback()
  }
  getAllFeedback(){
    this.api.getAllFeedbackListAPI().subscribe((res:any)=>{
      this.allFeedbacks = res
      console.log(this.allFeedbacks);
      
    })
  }

  updateFeedbackStatus(id : string, status:string){
    this.api.updateFeedbackListAPI(id, status).subscribe((res:any)=>{
      this.getAllFeedback()
    })
  }
}
