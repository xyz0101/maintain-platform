import { Injectable } from '@angular/core';
import { Http  ,Headers, Response,ResponseContentType ,URLSearchParams} from '@angular/http';
import { Observable, throwError} from 'rxjs';
import * as _ from 'lodash';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map } from"rxjs/operators";
import { EvalMgrYear } from 'src/app/entity/EvalMgrYear';
import { Result } from 'src/app/entity/Result';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http/src/enums';
@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {
private resData;
private searchUrl = "http://127.0.0.1:8762/eval/getEvalYearByCondition";
private updateUrl = "http://127.0.0.1:8762/eval/updateEvalYearMgr";
private searchIncludeEmpsUrl = "http://127.0.0.1:8762/eval/getEvalIncludeEmps";

private searchHrDeptRegionUrl = "http://127.0.0.1:8762/eval/getHrDeptRegion";
private saveHrDeptRegionUrl = "http://127.0.0.1:8762/eval/saveDeptRegionData";

private searchHrDeptRegionDtlUrl = "http://127.0.0.1:8762/eval/getHrDeptRegionDtl";
private saveHrDeptRegionDtlUrl = "http://127.0.0.1:8762/eval/saveDeptRegionDtlData";

private searchEvalDistQuotaUrl =  "http://127.0.0.1:8762/eval/getEvalDistQuota";
private exportEvalDistQuotaUrl =  "http://127.0.0.1:8762/eval/exportEvalDistQuota";
private saveEvalDistQuotaUrl = "http://127.0.0.1:8762/eval/saveEvalDistQuota";

private searchOrgListUrl = "http://127.0.0.1:8762/eval/getOrgList";
private downLoadEmpsUrl = "http://127.0.0.1:8762/eval/getExcel";

private refreshEvalDataUrl = "http://127.0.0.1:8762/eval/callRefreshEvalData";
private getProcessRateUrl = "http://127.0.0.1:8762/eval/getProcessRate";

private searchEvalEmployeeInfosUrl = "http://127.0.0.1:8762/eval/getEvalEmployeeInfos";

  constructor(private http:HttpClient,private downLoadHttp:Http) {}
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
      this.downLoadHttp.get(
      this.downLoadEmpsUrl,
      {responseType:ResponseContentType.Blob}
    ).subscribe(data => {
      this.generateExcel(data,"人员范围.xls")
    }
  )
  }
  /**
   * 导出评语分布率
   * @param searchValue 
   */
  exportEvalDistQuota(searchValue:string){
    const params = new URLSearchParams();
    params.set("searchValue",searchValue);
    const  headers= new Headers();
    headers.set("content-type","application/text;charset=UTF-8")
    headers.append("Authorization","authToken")
    const responseType = ResponseContentType.Blob;
    this.downLoadHttp.get(
      this.exportEvalDistQuotaUrl,
      {params: params,headers:headers, responseType:responseType}
    ).subscribe( data=>{
     this.generateExcel(data,"评语分布率.xls")
    }
      
    )
  }
  /**
   * 下载生成Excel
   * @param data 
   * @param title 
   */
generateExcel(data:any,title:string){
  const link = document.createElement('a');
  const blob = new Blob([data.blob()], {type: 'application/vnd.ms-excel'});
  link.setAttribute('href', window.URL.createObjectURL(blob));
  link.setAttribute('download', title);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



  /**
   * 获取人员 范围
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
  getHrDeptRegionDtl(searchValue:string):Observable<Result[]>{
    const params=new HttpParams().set('searchValue',searchValue)
    return  this.http.get<Result[]>(this.searchHrDeptRegionDtlUrl,{params} ).pipe(
      //异常处理
      catchError( this.handleError )
    );
   }
   /**
    * 获取所有的部门
    * @param searchValue 
    */
  getOrgList(searchValue:string):Observable<Result[]>{
    const params=new HttpParams().set('searchValue',searchValue)
      return  this.http.get<Result[]>(this.searchOrgListUrl,{params} ).pipe(
        //异常处理
        catchError( this.handleError )
      );
  }
  /**
   * 保存线的操作
   * @param addValue 
   */
  saveDeptRegion(addValue:string,deleteValue:string,updateValue:string):Observable<any>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      'Authorization': 'authToken'
    })
  }
    const params = new HttpParams().set("addValue",addValue).set("deleteValue",deleteValue).set("updateValue",updateValue);
    return  this.http.post(
        this.saveHrDeptRegionUrl,
        httpOptions,
        {params}
      ).pipe(
         //异常处理
      catchError( this.handleError )
      )
  }

/**
   * 保存线与部门关系的操作
   * @param addValue 
   */
  saveDeptRegionDtl(addValue:string,deleteValue:string,updateValue:string):Observable<any>{
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      'Authorization': 'authToken'
    })
  }
    const params = new HttpParams().set("addValue",addValue).set("deleteValue",deleteValue).set("updateValue",updateValue);
    return  this.http.post(
        this.saveHrDeptRegionDtlUrl,
        httpOptions,
        {params}
      ).pipe(
         //异常处理
      catchError( this.handleError )
      )
  }
  /**
   * 根据指定年份获取评语分布率
   * @param year 
   */
  getEvalDistQuotaByYear(searchValue:string):Observable<Result[]>{
    const params = new HttpParams().set("searchValue",searchValue);
    return this.http.get<Result[]>(this.searchEvalDistQuotaUrl,{params} ).pipe(
      catchError(this.handleError)
    )
  }
/**
 * 保存评语分布率
 * @param addValue 
 * @param deleteValue 
 * @param updateValue 
 */
saveEvalDistQuota(addValue:string,deleteValue:string,updateValue:string):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      'Authorization': 'authToken'
    })
  }
    const params = new HttpParams().set("addValue",addValue).set("deleteValue",deleteValue).set("updateValue",updateValue);
    return  this.http.post(
        this.saveEvalDistQuotaUrl,
        httpOptions,
        {params}
      ).pipe(
         //异常处理
      catchError( this.handleError )
      )
}

 /**
   * 查询评价记录
   * @param curPage 
   * @param searchValue 
   * @param sortKey 
   * @param sortValue 
   */
  getEvalEmployeeInfos(searchValue:string,curPage:string):Observable<Result[]>{
  
    const params=new HttpParams().set('curPage', curPage). set('searchValue',searchValue)
     return this.http.get<Result[]>(this.searchEvalEmployeeInfosUrl,{ params }).pipe(
       catchError( this.handleError )
     );
 
   }
   /**
    * 
    * @param datePoint 执行刷新程序并且返回id
    */
   callRefreshEvalData(datePoint:string):Observable<Result>{
    const params=new HttpParams().set("datePoint",datePoint);
     return this.http.get<Result>( this.refreshEvalDataUrl,{params} ).pipe(
      catchError( this.handleError )
     );
   }
   /**
    * 
    * @param executorId 获取程序执行进度
    */
   getProcessRate(executorId:string):Observable<Result>{
    const params=new HttpParams().set("executorId",executorId);
    return this.http.get<Result>(this.getProcessRateUrl,{params}).pipe(
      catchError(this.handleError)
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

 


}
