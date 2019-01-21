import { DataSource } from "@angular/cdk/collections";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { EvalServiceService } from "src/app/eval-service.service";
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from "rxjs/operators";
import { EvalMgrYear } from "src/app/entity/EvalMgrYear";
import { Result } from "src/app/entity/Result";
import { PageInfo } from "src/app/entity/PageInfo";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { EvalIncludeEmps } from "src/app/entity/EvalEncludeEmps";

export class EvalDataSource implements DataSource<any>{
    
    public evalMgrSubject = new BehaviorSubject<any[]>([]);
    public myData = new Array<any>();
    public loadingEvalSubject = new BehaviorSubject<boolean>(false);
    public pageInfo = new PageInfo();
    public loading$ = this.loadingEvalSubject.asObservable();
    public length:number;
    constructor(private evalService:EvalServiceService){}
    
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      
        return this.evalMgrSubject.asObservable();
       
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.evalMgrSubject.complete();
        this.loadingEvalSubject.complete();
       
    }

    /**
     * 加载人员范围
     * @param curPage 
     */
    loadIncludeEmps(curPage:string){
        this.loadingEvalSubject.next(true);
        this.evalService.getIncludeEmps(curPage).subscribe(
            res=>{
                res.map(
                    result=>{
                        this.pageInfo=result.data.pageInfo;
                        this.evalMgrSubject.next(result.data.listData);
                        this.myData=result.data.listData;
                        console.log(result.data.listData);
                        this.length=result.data.listData.length;
                        this.loadingEvalSubject.next(false);
                    }
                )
            }
        )
    }


    /**
     * 
     * @param curPage 加载一次评语数据
     * @param updateMap 
     * @param curList 
     * @param searchValue 
     * @param sortKey 
     * @param sortValue 
     */
    loadEval(curPage:string,updateMap:Map<string,EvalMgrYear>,curList:Array<EvalMgrYear>,searchValue:string,sortKey:string,sortValue:string){
        this.loadingEvalSubject.next(true);
      
        this.evalService.getEval(curPage,searchValue,sortKey,sortValue).pipe(
            catchError(this.evalService.handleError)   
        ).subscribe(
            res=>{
                res.map(
                    result=>{
                        console.log("result")
                        console.log(result)
                        console.log("result")
                        this.pageInfo=result.data.pageInfo;
                        //判断是否有修改过的内容
                        var dataArray = new Array<EvalMgrYear>();
                        for(var i=0;i<result.data.listData.length;i++){
                              
                            var value= result.data.listData[i];
                            if(value.firstSubmit!="Y"){
                                value.isUnSubmit=true;
                            }else{
                                value.isUnSubmit=false;
                            }
                           var key=this.getKey(value);
                           // console.log("key====》"+key)
                           curList[i]=this.getNewValue(value);
                            if(updateMap.get(key)!=null){
                                dataArray.push(updateMap.get(key))
                            }else{
                                dataArray.push(value)
                            }
                        }
                        this.evalMgrSubject.next(dataArray );
                        this.length=result.data.listData.length;
                        this.loadingEvalSubject.next(false);
                    }
                );
                
               // this.evalMgrSubject.next( )
               
            }

        )



    }

    public  getKey(value:EvalMgrYear) : string{
   
        return value.employeeCode+""+value.employeeLevel+""+
        value.employeeName+""+value.mgrCode+""+
        value.mgrName+""+value.orgFullName+""+
        value.statu+""+value.firstSubmit+""+
        value.evalYear+""+value.levelFirst+""+value.isUnSubmit+"";
   }
   public getNewValue(value:EvalMgrYear) : EvalMgrYear{
       var newValue = new EvalMgrYear();
       newValue.employeeCode=value.employeeCode
       newValue.employeeLevel =value.employeeLevel;
       newValue.employeeName=value.employeeName;
       newValue.mgrCode=value.mgrCode;
       newValue.mgrName=value.mgrName;
       newValue.orgFullName=value.orgFullName;
       newValue.statu=value.statu;
       newValue.firstSubmit=value.firstSubmit;
       newValue.evalYear=value.evalYear;
       newValue.levelFirst=value.levelFirst;
       newValue.isUnSubmit=value.isUnSubmit;
       return newValue;
   }
}

