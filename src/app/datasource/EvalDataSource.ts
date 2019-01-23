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
import { DataStatus } from "src/app/entity/DataStatus";
export class EvalDataSource  {
    
    public  dataStatus = new DataStatus();
    public  dataStatus1 = new DataStatus();
    constructor(private evalService:EvalServiceService){}
    
   
    /**
     * 加载人员范围
     * @param curPage 
     */
    loadIncludeEmps(curPage:string){
        this.dataStatus.loadingEvalSubject.next(true);
        this.evalService.getIncludeEmps(curPage).subscribe(
            res=>{
                res.map(
                    result=>{
                        this.dataStatus.pageInfo=result.data.pageInfo;
                        this.dataStatus.evalMgrSubject.next(result.data.listData);
                        this.dataStatus.myData=result.data.listData;
                        console.log(result.data.listData);
                        this.dataStatus.length=result.data.listData.length;
                        this.dataStatus.loadingEvalSubject.next(false);
                    }
                )
            }
        )
    }
 /**
     * 加载所有线
     */
    loadHrDeptRegion( updateMap:Map<string,any>,curList:Array<any>){
        this.dataStatus.loadingEvalSubject.next(true);
        this.evalService.getHrDeptRegion().subscribe(
            res=>{
                res.map(
                    result=>{
                        this.dataStatus.pageInfo=result.data.pageInfo;
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        this.dataStatus.evalMgrSubject.next(dataArray);
                        this.dataStatus.myData=dataArray;
                        console.log("loadHrDeptRegion-----")
                        console.log(result.data.listData);
                        this.dataStatus.length=result.data.listData.length;
                        this.dataStatus.loadingEvalSubject.next(false);
  
                    }
                )
            }
        )
    }
 /**
     * 加载所有线与部门
     */
    loadHrDeptRegionDtl( updateMap:Map<string,any>,curList:Array<any>  ){
        this.dataStatus1.loadingEvalSubject.next(true);
        this.evalService.getHrDeptRegionDtl().subscribe(
            res=>{
                res.map(
                    result=>{
                        this.dataStatus1.pageInfo=result.data.pageInfo;
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        this.dataStatus1.evalMgrSubject.next(dataArray);
                        this.dataStatus1.myData=dataArray;
                        console.log("getHrDeptRegionDtl-----")
                        console.log(result.data.listData);
                        this.dataStatus1.length=result.data.listData.length;
                        this.dataStatus1.loadingEvalSubject.next(false);
                        
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
    loadEval(curPage:string,updateMap:Map<string,any>,curList:Array<any>,searchValue:string,sortKey:string,sortValue:string){
        this.dataStatus.loadingEvalSubject.next(true);
      
        this.evalService.getEval(curPage,searchValue,sortKey,sortValue).pipe(
            catchError(this.evalService.handleError)   
        ).subscribe(
            res=>{
                res.map(
                    result=>{
                        console.log("result")
                        console.log(result)
                        console.log("result")
                        this.dataStatus. pageInfo=result.data.pageInfo;
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        this.dataStatus. evalMgrSubject.next(dataArray );
                        this.dataStatus. length=result.data.listData.length;
                        this.dataStatus. loadingEvalSubject.next(false);
                    }
                );
                
               // this.evalMgrSubject.next( )
               
            }

        )



    }

   
   checkUpdate(updateMap:Map<string,any>,curList:Array<any>,listData: Array<any> ):Array<any>{
    var dataArray = new Array<any>();
    for(var i=0;i< listData.length;i++){
          
        var value= listData[i];
        if(value.firstSubmit!="Y"){
            value.isUnSubmit=true;
        }else{
            value.isUnSubmit=false;
        }
       var key=JSON.stringify(value);
       // console.log("key====》"+key)
       curList[i]=JSON.parse(JSON.stringify(value));
        if(updateMap.get(key)!=null){
            dataArray.push(updateMap.get(key))
        }else{
            dataArray.push(value)
        }
    }
    return dataArray;
   }
}

