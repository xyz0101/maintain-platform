import { Injectable } from '@angular/core';
import { Http  , Response,ResponseContentType } from '@angular/http';
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
private searchHrDeptRegionUrl = "http://127.0.0.1:8762/eval/getHrDeptRegion";
private searchHrDeptRegionDtlUrl = "http://127.0.0.1:8762/eval/getHrDeptRegionDtl";
private downLoadEmpsUrl = "http://127.0.0.1:8762/eval/getExcel";
  constructor(private http:HttpClient,private https:Http) {}
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
   * 下载文件
   * 使用Http组件获取返回的的数据，文件将会放在blob里面，然后构造 blob 模拟a标签 点击下载文件
   */
  downLoadExcel() {
      this.https.get(
      this.downLoadEmpsUrl,
      {responseType:ResponseContentType.Blob}
    ).subscribe(data => {
      const link = document.createElement('a');
      const blob = new Blob([data.blob()], {type: 'application/vnd.ms-excel'});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', '人员范围.xls');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  )
  }
  /**
   * 获取人员那范围
   * @param curPage 
   */
  getIncludeEmps(curPage:string):Observable<Result[]>{
    const params=new HttpParams().set("curPage",curPage);
    return  this.http.get<Result[]>(this.searchIncludeEmpsUrl,{params}).pipe(
      //异常处理
      catchError( this.handleError )
    );
  }
  /**
   * 获取所有的线
   */
 getHrDeptRegion():Observable<Result[]>{
  return  this.http.get<Result[]>(this.searchHrDeptRegionUrl ).pipe(
    //异常处理
    catchError( this.handleError )
  );
 }
/**
   * 获取所有的线与部门关系
   */
  getHrDeptRegionDtl():Observable<Result[]>{
    return  this.http.get<Result[]>(this.searchHrDeptRegionDtlUrl ).pipe(
      //异常处理
      catchError( this.handleError )
    );
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

 


}
