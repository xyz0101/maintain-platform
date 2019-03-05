
import { Observable, BehaviorSubject, of } from "rxjs";
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from "rxjs/operators";
import { EvalMgrYear } from "src/app/entity/EvalMgrYear";
import { Result } from "src/app/entity/Result";
import { PageInfo } from "src/app/entity/PageInfo";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { EvalIncludeEmps } from "src/app/entity/EvalEncludeEmps";
import { DataStatus } from "src/app/entity/DataStatus";
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
export class EvalDataSource  {
    
    public  dataStatus = new DataStatus();
    public  dataStatus1 = new DataStatus();
    public  dataStatus2 = new DataStatus();
    constructor(public evalService:EvalServiceService){
        registerLocaleData(zh)
    }
    
   
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
     * 
     * @param searchValue 加载所有部门
     */
    loadOgrList(searchValue:string){
        this.evalService.getOrgList(searchValue).subscribe(res=>{
            res.map(result=>{
                this.dataStatus2.myData=result.data.listData;
            })
        })
    }

 /**
     * 加载所有线与部门
     */
    loadHrDeptRegionDtl( updateMap:Map<string,any>,curList:Array<any> ,searchValue:string ){
        this.dataStatus1.loadingEvalSubject.next(true);
        this.evalService.getHrDeptRegionDtl(searchValue).subscribe(
            res=>{
                res.map(
                    result=>{
                        this.dataStatus1.pageInfo=result.data.pageInfo;
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        this.dataStatus1.evalMgrSubject.next(dataArray);
                        this.dataStatus1.myData=dataArray;
                        console.log("getHrDeptRegionDtl-----加载数据")
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

                         result.data.listData.forEach(item=>{
                            if(item.firstSubmit!="Y"){
                                item.isUnSubmit=true;
                            }else{
                                item.isUnSubmit=false;
                            }
                         })
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        this.dataStatus.myData=dataArray;
                        this.dataStatus. evalMgrSubject.next(dataArray );
                        this.dataStatus. length=result.data.listData.length;
                        this.dataStatus. loadingEvalSubject.next(false);
                    }
                );
            }
        )
    }
    /**
     * 加载评语分布率
     * @param year 
     * @param updateMap 
     * @param curList 
     */
    loadEvalDistQuota(searchValue:string,updateMap:Map<string,any>,curList:Array<any>){
        //开始加载
        this.dataStatus.loadingEvalSubject.next(true);
        this.evalService.getEvalDistQuotaByYear(searchValue).subscribe(
            res=>{
                res.map(
                    result=>{
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        //存储数据
                        this.dataStatus.myData=dataArray;
                        this.dataStatus.pageDate=result.data
                        this.dataStatus. evalMgrSubject.next(dataArray );
                        //加载完毕
                        this.dataStatus. loadingEvalSubject.next(false);
                    }
                )
            }
        )
    }
    /**
     * 加载评价人员
     * @param searchValue 
     * @param curPage 
     */
    loadEvalEmployeeInfos(searchValue:string,curPage:string){
        this.dataStatus.loadingEvalSubject.next(true)
        this.evalService.getEvalEmployeeInfos(searchValue,curPage).subscribe(res=>{
            res.map(result=>{
                this.dataStatus.myData= result.data.listData;
                this.dataStatus.pageDate =result.data;
                this.dataStatus.pageInfo = result.data.pageInfo;
                this.dataStatus.loadingEvalSubject.next(false)
            }) 
        })
    }

    loadOgrLeaderList(updateMap:Map<string,any>,curList:Array<any>){
        this.dataStatus.loadingEvalSubject.next(true)
        this.evalService.getOrgLeaderList().subscribe(
            res=>{
                res.map(result=>{
                    this.dataStatus.myData= this.checkUpdate(updateMap,curList,result.data.listData)  ;
                    this.dataStatus.loadingEvalSubject.next(false)
                }) 
            })
        
    }




   
   checkUpdate(updateMap:Map<string,any>,curList:Array<any>,listData: Array<any> ):Array<any>{
    var dataArray = new Array<any>();
    for(var i=0;i< listData.length;i++){
          
        var value= listData[i];
      
       var key=JSON.stringify(value);
       // console.log("key====》"+key)
       curList[i]=JSON.parse(JSON.stringify(value));
       if(curList.length>0){
        if(updateMap.get(key)!=null){
            dataArray.push(updateMap.get(key))
        }else{
            dataArray.push(value)
        }
    }
    }
    return dataArray;
   }


}

