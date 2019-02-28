import { Component, OnInit } from '@angular/core';
import { InterceptorServiceService } from 'src/app/interceptor-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 constructor(private interceptorService:InterceptorServiceService ){
   
 } 
  ngOnInit(): void {
    
this.interceptorService.getAuth().subscribe(res=>{
  if(!(res.code=="200"&&res.data!=null&&res.data!="null")) {
     //this.interceptorService.gotoLogin();
  }
})

    
  }
  title = 'HR-运维平台';
  
}
