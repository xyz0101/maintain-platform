import { Injectable } from '@angular/core';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/entity/Result';
import { catchError } from 'rxjs/operators';
import { RequestOptionsArgs } from '@angular/http';

import { NzMessageService } from 'ng-zorro-antd';


 
@Injectable({
  providedIn: 'root'
})
export class TargetService extends EvalServiceService{

  constructor(public http:HttpClient,public downLoadHttp:Http,public message: NzMessageService) {super(http,downLoadHttp,message);}
   //请求头
   public headers=new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'authToken'
  })

   

//本地开发模式
  public  baseEvalUrl= "http://127.0.0.1:8700/target";
//测试环境
  // public  baseEvalUrl= "http://172.16.134.98:8700/target";
//获取所有的时间节点
private allDatePointUrl = this.baseEvalUrl+"/getAllDatePoint";
//获取权限是否打开
private authIsOpenUrl = this.baseEvalUrl+"/getAuthIsOpen";
//修改权限是否打开
private updateAllAuthUrl = this.baseEvalUrl+"/updateAllAuth";
//修改时间节点
private updateDatePointUrl = this.baseEvalUrl+"/updateDatePoint";
//推送待办
private  insertEvalVirtRecordUrl =this.baseEvalUrl + '/insertEvalVirtRecord'
//删除待办
private  deleteRocordProcessUrl  = this.baseEvalUrl + '/deleteRocordProcess' 
//查询待办数据
private getEndDateUrl = this.baseEvalUrl + '/getEndDate'


// 获取evel信息
  private selectEvalInfoUrl =this.baseEvalUrl+'/queryEmpEvalData';
  private data: object;
/**
 * 获取所有的时间节点
 */
getAllDatePoint():Observable<Result[]>{
  return this.http.get<Result[]>(this.allDatePointUrl).pipe(
    catchError(this.handleError)
  )
}
/**
 * 获取权限是否打开
 */
getAuthIsOpen():Observable<Result[]>{
  return this.http.get<Result[]>(this.authIsOpenUrl).pipe(
    catchError(this.handleError)
  )
}
/**
 * 修改权限是否全部打开
 * @param value 
 */
updateAllAuth(value:string):Observable<any>{
  const params = new HttpParams().set("value",value)
  const httpOptions = {
    headers: this.headers,
    params:params
  }
  return this.http.put<any>(this.updateAllAuthUrl,null,httpOptions);
}
/**
 * 修改时间节点
 * @param addValue 
 * @param deleteValue 
 * @param updateValue 
 */
updateDatePoint(addValue:string,deleteValue:string,updateValue:string):Observable<any>{
  
  const params = new HttpParams().set("addValue",addValue).set("deleteValue",deleteValue).set("updateValue",updateValue);
  const httpOptions = {
    headers: this.headers,
    params: params
  }
  return this.http.post(this.updateDatePointUrl, null , httpOptions );
}

   queryEvalInfo( year: string): Observable<Result[]> {
  const param = new HttpParams().set('year', year);
    const httpOptions = {
      headers: this.headers,
      params: param
    }
     return this.http.get<Result[]>( this.selectEvalInfoUrl, httpOptions).pipe();
  }

  
  insertRecodeEval(par: string): Observable<Result[]> {
    const params = new HttpParams().set('param', par);
    const HttpOptions = {
      headers: this.headers,
      params: params
    }
    
    return this.http.post<Result[]>(this.insertEvalVirtRecordUrl , null, HttpOptions ).pipe();
  }

  
  deleteVirtRecord(key: string): Observable<Result[]> {
    const params = new HttpParams().set('param', key);
    const HttpOptions = {
      headers: this.headers,
      params: params
    };
    
    return this.http.post <Result[]>(this.deleteRocordProcessUrl  , null, HttpOptions).pipe();
  }

  getTempVerEndDate(qN: string): Observable<Result[]> {
    const params = new HttpParams().set('qN', qN);
    const HttpOptions = {
      headers: this.headers ,
      params: params
    }
    
    return this.http.post <Result[]>(this.getEndDateUrl , null, HttpOptions).pipe();
  }
}
