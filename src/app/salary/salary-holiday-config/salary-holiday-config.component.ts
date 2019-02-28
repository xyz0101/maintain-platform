import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService, NzCalendarComponent } from 'ng-zorro-antd';
import { TargetService } from 'src/app/target-service/target.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NzCalendarHeaderComponent } from 'ng-zorro-antd/calendar/nz-calendar-header.component';
import { SalaryDataSource } from 'src/app/datasource/SalaryDataSource';
import { SalaryService } from 'src/app/salary-service/salary.service';
import { SalaryHoliday } from 'src/app/entity/SalaryHoliday';
  
@Component({
  selector: 'app-salary-holiday-config',
  templateUrl: './salary-holiday-config.component.html',
  styleUrls: ['./salary-holiday-config.component.css']
})
export class SalaryHolidayConfigComponent extends MyComponent {
  //声明数据源
  public dataSource :SalaryDataSource;
  public temp:boolean;
  public dataMap = new Map();
  
  
  //public dataMap :Map<string,any>;
  loadData() {
     
    this.dataSource.loadSalaryHoliday(this.selectedYear,this.selectedMonth,this.dataMap)
    
    
    
    
  }
  initSearchFields() {
    throw new Error("Method not implemented.");
  }
  public selectedDate; 
  public years=[];
  public months=[{value:0,label:'1月'},{value:1,label:'2月'},{value:2,label:'3月'},{value:3,label:'4月'},{value:4,label:'5月'},
                 {value:5,label:'6月'},{value:6,label:'7月'},{value:7,label:'8月'},{value:8,label:'9月'},{value:9,label:'10月'},
                 {value:10,label:'11月'},{value:11,label:'12月'}]
  public selectedYear;
  public selectedMonth;
   //注入路由信息,以及评价的服务
   constructor( public routerInfo:ActivatedRoute,public salaryService:SalaryService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService,public  datePipe: DatePipe ) { 
      super(routerInfo,salaryService,fb,modalService,msg)
      
  }
  
  ngOnInit() {

        //获取当前年
      let curDate= new Date();
       
       this.years[0]=curDate.getFullYear()-2
      this.years[1]=curDate.getFullYear()-1
      this.years[2]=curDate.getFullYear()
      this.years[3]=curDate.getFullYear()+1
      this.years[4]=curDate.getFullYear()+2
      this.selectedYear=curDate.getFullYear();
      this.selectedMonth=curDate.getMonth()+1;
      this.initDate();
      
      //移除选择日期的组件 使用自定义的日期选择器
     //  $('#cal').children().get(0).remove()
       this.removeHeader()
      
    
  }


  /**
   * 初始化选择的日期，并加载数据
   */
  initDate(){
    console.log( "当前月份==>"+this.selectedMonth)
    for(let i=1;i<=31;i++){
      if(this.dataMap.get(this.selectedYear+"-"+this.selectedMonth+"-"+i)==null){
          this.dataMap.set(this.selectedYear+"-"+this.selectedMonth+"-"+i ,
      new SalaryHoliday())
      }
    
  }
 
    this.selectedDate = new Date(this.selectedYear,this.selectedMonth,1);
     this.initTable(new SalaryDataSource(this.salaryService))
  }
 

monthChange(event){
console.log(event)
this.selectedMonth=event;
this.initDate()
}
yearChange(event){
  this.selectedYear=event;
  console.log(event)
  this.initDate()
}

seveHoliday(){
   
 }






//移除选择日期的组件 使用自定义的日期选择器(IE使用)
 removeHeader(): any {
  var interval= setInterval(function(){
//console.log()
if($('#cal').children().get(0).getAttribute('style')!='display:none'){
  console.log($('#cal').children().get(0).getAttribute('style'))
   $('#cal').children().get(0).setAttribute('style','display:none')
}else{
  clearInterval(interval);
}
   
},50)
}

holidayChange(){
  console.log('改变----------',this.dataMap)
}

salaryChange(){
  console.log('改变----------',this.dataMap)
}

}
