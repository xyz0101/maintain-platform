import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService, NzCalendarComponent } from 'ng-zorro-antd';
import { TargetService } from 'src/app/target-service/target.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NzCalendarHeaderComponent } from 'ng-zorro-antd/calendar/nz-calendar-header.component';
 
@Component({
  selector: 'app-salary-holiday-config',
  templateUrl: './salary-holiday-config.component.html',
  styleUrls: ['./salary-holiday-config.component.css']
})
export class SalaryHolidayConfigComponent extends MyComponent {
  loadData() {
    throw new Error("Method not implemented.");
  }
  initSearchFields() {
    throw new Error("Method not implemented.");
  }
  public selectedDate;
   //注入路由信息,以及评价的服务
   constructor( public routerInfo:ActivatedRoute,public targetService:TargetService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService,public  datePipe: DatePipe ) { 
      super(routerInfo,targetService,fb,modalService,msg)
      
  }
  
  ngOnInit() {
     this.selectedDate = new Date('2018-01-01')
  }

}
