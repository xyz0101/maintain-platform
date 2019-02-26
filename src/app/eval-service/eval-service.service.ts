import { Injectable } from '@angular/core';
import { Http  ,Headers, Response,ResponseContentType ,URLSearchParams} from '@angular/http';
import { Observable, throwError} from 'rxjs';
import * as _ from 'lodash';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { EvalMgrYear } from 'src/app/entity/EvalMgrYear';
import { Result } from 'src/app/entity/Result';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http/src/enums';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {
private resData;
//本地开发模式
    public  baseEvalUrl= "http://127.0.0.1:8700/eval";
//测试环境
 // private  baseEvalUrl= "http://172.16.134.98:8700/eval";


// 查询年度评价数据
private searchUrl =   this.baseEvalUrl+"/getEvalYearByCondition";
// 修改年度评价数据
private updateUrl =   this.baseEvalUrl+"/updateEvalYearMgr";
// 查询人员范围
private searchIncludeEmpsUrl =   this.baseEvalUrl+"/getEvalIncludeEmps";
// 查询线
private searchHrDeptRegionUrl =   this.baseEvalUrl+"/getHrDeptRegion";
// 保存线修改
private saveHrDeptRegionUrl =   this.baseEvalUrl+"/saveDeptRegionData";
// 查询线与部门关系
private searchHrDeptRegionDtlUrl =   this.baseEvalUrl+ "/getHrDeptRegionDtl";
// 保存线与部门关系
private saveHrDeptRegionDtlUrl =   this.baseEvalUrl+"/saveDeptRegionDtlData";
// 查询评语分布率
private searchEvalDistQuotaUrl =    this.baseEvalUrl+"/getEvalDistQuota";
//导出评语分布率
private exportEvalDistQuotaUrl =    this.baseEvalUrl+"/exportEvalDistQuota";
// 保存评语分布率
private saveEvalDistQuotaUrl =   this.baseEvalUrl+"/saveEvalDistQuota";
//获取所有部门
private searchOrgListUrl =   this.baseEvalUrl+"/getOrgList";
//导出人员范围
private downLoadEmpsUrl =   this.baseEvalUrl+"/getExcel";
//执行刷新数据分发
private refreshEvalDataUrl =   this.baseEvalUrl+"/callRefreshEvalData";
//获取进度
private getProcessRateUrl =   this.baseEvalUrl+"/getProcessRate";
//获取人员信息
private searchEvalEmployeeInfosUrl =   this.baseEvalUrl+"/getEvalEmployeeInfos";

//获取部门对应部门正职
private searchOrgLeaderUrl =    this.baseEvalUrl+"/getOrgLeaderList";
//保存部门对应部门正职
private saveOrgLeaderUrl =    this.baseEvalUrl+"/saveOrgLeaderList";

//获取输入的员工
private getInputEmpListUrl =    this.baseEvalUrl+"/getInputEmpList";

//完成年度评价数据准备
private finishEvalReadyUrl=this.baseEvalUrl+"/finishEvalReady";
//上传评语分布率
public uploadDistQuotaUrl=this.baseEvalUrl+"/postExcelEvalDistQuota?year=";
//上传人员范围
public postEmpRangeUrl = this.baseEvalUrl+"/postExcel";
 
public  headers= new HttpHeaders();


public dataDate :Date;

  constructor(public http:HttpClient,public downLoadHttp:Http) {
   
  }
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
    // const  headers= new Headers();
    // headers.set("content-type","application/text;charset=UTF-8")
    // headers.append("Authorization","authToken")
    const responseType = ResponseContentType.Blob;
    this.downLoadHttp.get(
      this.exportEvalDistQuotaUrl,
      {params: params,
       // headers:headers, 
        responseType:responseType}
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
  getEvalDistQuotaByYear(searchValue: string):Observable<Result[]> {
    const params = new HttpParams().set('searchValue', searchValue);
    return this.http.get<Result[]>(this.searchEvalDistQuotaUrl, { params}  ).pipe(
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
    *  获取部门对应的部门正职
    */
   getOrgLeaderList():Observable<Result[]>{
     return this.http.get<Result[]>(this.searchOrgLeaderUrl).pipe( catchError(this.handleError))
   }
   /**
    * 获取员工
    * @param inputValue 
    */
   getInputEmpList(inputValue:string):Observable<any[]>{
     const params = new HttpParams().set("inputValue",inputValue)
     return this.http.get<any[]>(this.getInputEmpListUrl,{params}).pipe( catchError(this.handleError))
   }
   

/**
 * 保存部门对应的部门正职
 * @param addValue 
 * @param deleteValue 
 * @param updateValue 
 */
saveOrgLeaderList(addValue:string,deleteValue:string,updateValue:string):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/text',
      'Authorization': 'authToken'
    })
  }
    const params = new HttpParams().set("addValue",addValue).set("deleteValue",deleteValue).set("updateValue",updateValue);
    return  this.http.post(
        this.saveOrgLeaderUrl,
        httpOptions,
        {params}
      ).pipe(
         //异常处理
      catchError( this.handleError )
      )
}
/**
 * 完成年度评价数据准备
 */
finishEvalReady():Observable<Result>{
  const params = new HttpParams().set("dataDate",this.dataDate.getTime()+"")
  return this.http.get<Result>(this.finishEvalReadyUrl,{params}).pipe(
    catchError(this.handleError)
  )
}


uploadExcel(item: UploadXHRArgs):Observable<any>{
  const formData = new FormData();
  formData.append('excelFile', item.file as any);
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      withCredentials: false,//当此选项（是否携带cookis）为true的时候后端的跨域设置不能为 Access-Control-Allow-Origin: *
    });
    return this.http.request(req);
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
