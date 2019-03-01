import { DataStatus } from "src/app/entity/DataStatus";
import { EvalDataSource } from "src/app/datasource/EvalDataSource";
import { SalaryService } from "src/app/salary-service/salary.service";
 import { SalaryHoliday } from "src/app/entity/SalaryHoliday";

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
                     
                     dataMap.get( item.key ).dateType=item.dateType=="true"
                     dataMap.get( item.key ).salaryDay=item.salaryDay=="true"
                  })
                  console.log('数据====》',    dataMap ) 
                this.dataStatus.loadingEvalSubject.next(false);
            })

        })
    }


}