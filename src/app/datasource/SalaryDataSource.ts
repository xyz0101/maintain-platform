import { DataStatus } from "src/app/entity/DataStatus";
import { EvalDataSource } from "src/app/datasource/EvalDataSource";
import { SalaryService } from "src/app/salary-service/salary.service";

import { SalaryHoliday } from "src/app/entity/SalaryHoliday";
import {Observable} from 'rxjs';

 export class SalaryDataSource  extends EvalDataSource{
    constructor(public salaryService: SalaryService){
         super(salaryService)
    }
    public  dataStatus = new DataStatus();
    public  dataStatus1 = new DataStatus();
    public  dataStatus2 = new DataStatus();

    public loadSalaryHoliday(year:number ,month:number,dataMap:Map<string,SalaryHoliday>){
        var yearMonth= year+""+(month<10?("0"+month):month)
      
        console.log('数据====》',     dataMap ) 
        this.dataStatus.loadingEvalSubject.next(true);
        this.salaryService.getSlrHoliday(yearMonth).subscribe(res=>{
            res.map(data=>{
               console.log(data) 
             
                this.dataStatus.myData = data.data.listData;
                this.dataStatus.myData.forEach(item=>{
                     if(item.key!=null){
                        dataMap.get( item.key ).dateType=item.dateType=="true"
                        dataMap.get( item.key ).salaryDay=item.salaryDay=="true"
                        dataMap.get( item.key ).key= item.key
                        dataMap.get( item.key ).dateDate=null;
                     }
                   
                  })
                  console.log('数据=======》',    this.dataStatus.myData ) 
                this.dataStatus.loadingEvalSubject.next(false);
            })

        })
    }

    // public loadSpecialHumanItem(empCode: string , salaryItemCode: string): Observable<any> {
    //     return this.salaryService.getSpecialHumanConfigInfo(empCode,salaryItemCode);
    // }

    loadSpecialHumanItem(updateMap:Map<string,any>,curList:Array<any>){
        //开始加载
        this.dataStatus.loadingEvalSubject.next(true);
        this.salaryService.getSpecialHumanConfigInfo().subscribe(
            res=>{
                res.map(
                    result=>{
                        console.log('结果',result)
                        //判断是否有修改过的内容
                        var dataArray =  this.checkUpdate(updateMap,curList,result.data.listData);
                        //存储数据
                        this.dataStatus.myData=dataArray;
                        this.dataStatus.pageDate=result.data;
                        this.dataStatus.anyData = [{label:'不发该项工资',value:'A'},{label:'试用期不降挡',value:'B'}];
                        //加载完毕
                        this.dataStatus.loadingEvalSubject.next(false);
                    }
                )
            }
        )
    }

}