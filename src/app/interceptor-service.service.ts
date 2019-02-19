import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpSentEvent,HttpRequest,HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 import { mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
  
@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor{
private authUrl="http://172.16.90.68:7777/ssologin/service/ssologinuser";
private auth = false;
private logionUrl="http://172.16.90.68:7777/ssologin/login.jsp?authn_try_count=0&contextType=external&username=string&contextValue=%2Foam&password=sercure_string&challenge_url=http%3A%2F%2F172.16.90.68%3A7777%2Fssologin%2Flogin.jsp&ssoCookie=disablehttponly&request_id=-7090512630440787505&locale=zh_CN&resource_url=http://172.16.90.68:7777/hrmaintain";
  constructor(private router:Router,private http:HttpClient) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<
  | HttpHeaderResponse
  | HttpResponse<any>
> {   
  console.log("拦截")
 
  return next.handle(request).pipe( mergeMap((event: any) => {
    // if(request.url==this.authUrl){
    //  // console.log("url====》"+request.url)
    //  return of(event);
    // }else{
    //    if(!this.auth){
    //     this.gotoLogin();
    //   }
    // }
   
    return of(event);
  }))
  }
  

  isAuth():boolean{
    var flag = false;
    this.getAuth() 
    .subscribe(res=>   {
       
     if(res.code=="200"&&res.data!=null&&res.data!="null") {
       flag =true;
     
     }
     this.auth =flag;
    })
    return flag;
  }



  gotoLogin(){
    　 window.location.href=this.logionUrl;
  }
 
  getAuth():Observable<any>{
    console.log("开始请求权限")
     var obs = this.http.get<any>(this.authUrl) 
     
     return obs ;
   }
}
