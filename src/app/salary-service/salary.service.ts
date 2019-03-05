import { Injectable } from '@angular/core';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/entity/Result';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends EvalServiceService{

  constructor(public http:HttpClient,public downLoadHttp:Http,public message: NzMessageService) {super(http,downLoadHttp,message);}
  //请求头
  public headers=new HttpHeaders({
   'Content-Type':  'application/json',
   'Authorization': 'authToken'
 })

  

//本地开发模式
public  baseEvalUrl= "http://127.0.0.1:8700/salary";
//测试环境
//  public  baseEvalUrl= "http://172.16.134.98:8700/salary";
//获取假期的地址
public slrHolidayUrl =this.baseEvalUrl+ "/getSlrHoliday";

public saveSlrHolidayUrl=this.baseEvalUrl+"/saveSlrHoliday"

/**
 * 根据年月获取当月假期
 * @param yearMonth 
 */
public getSlrHoliday(yearMonth:string):Observable<Result[]>{
  const params = new HttpParams().set("yearMonth",yearMonth)
  const httpOptions = {
    headers: this.headers,
    params:params
  }
  return this.http.get<Result[]>(this.slrHolidayUrl,httpOptions).pipe(
    catchError(this.handleError)
  )
}
/**
 * 保存对节假日的修改
 * @param slrHoliday 
 */
public saveSlrHoliday(slrHoliday:string):Observable<any>{
    const params = new HttpParams().set("slrHoliday",slrHoliday);
    const httpOptions = {
      headers: this.headers,
      params:params
    }
    return  this.http.post(
        this.saveSlrHolidayUrl,
        null,
        httpOptions
      ).pipe(
         //异常处理
      catchError( this.handleError )
      )
}















}
