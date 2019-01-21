import { Injectable } from '@angular/core';
import { Http  , Response} from '@angular/http';
import { Observable, throwError} from 'rxjs';
import * as _ from 'lodash';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map } from"rxjs/operators";
import { EvalMgrYear } from 'src/app/entity/EvalMgrYear';
import { Result } from 'src/app/entity/Result';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {
private resData;
private searchUrl = "http://127.0.0.1:8762/eval/getEvalYearByCondition";
private updateUrl = "http://127.0.0.1:8762/eval/updateEvalYearMgr";
private searchIncludeEmpsUrl = "http://127.0.0.1:8762/eval/getEvalIncludeEmps";

  constructor(private http:HttpClient) {}
  /**
   * 查询评价记录
   * @param curPage 
   * @param searchValue 
   * @param sortKey 
   * @param sortValue 
   */
  getEval(curPage:string,searchValue:string,sortKey:string,sortValue:string):Observable<Result[]>{
  
   const params=new HttpParams().set('curPage', curPage). set('searchValue',searchValue). set('sortKey',sortKey). set('sortValue',sortValue);
    return this.http.get<Result[]>(this.searchUrl,{ params }).pipe(
      catchError( this.handleError )
    );

  }
  /**
   * 修改评价记录
   */
  updateEval(updateParams:string):Observable<Boolean>{
   //请求头
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'authToken'
      })
    };
    console.log("修改的参数是====>"+updateParams)
   return this.http.put<Boolean>(
    this.updateUrl,
    updateParams ,
    httpOptions
   ).pipe(
    catchError( this.handleError )
  )
  }

/**
 * 异常处理
 * @param error 
 */
  public handleError(error: HttpErrorResponse) {
    console.log("异常处理")
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('发生错误:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `返回状态码 ${error.status}, ` +
        `返回 ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      '请求失败');
  };

  getIncludeEmps(curPage:string):Observable<Result[]>{
    const params=new HttpParams().set("curPage",curPage);
    return  this.http.get<Result[]>(this.searchIncludeEmpsUrl,{params}).pipe(
      //异常处理
      catchError( this.handleError )
    );

    
  }



}
