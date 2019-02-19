import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { TargetDataSource } from 'src/app/datasource/TargetDataSource';
import { ActivatedRoute } from '@angular/router';
import { TargetService } from 'src/app/target-service/target.service';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-target-self-todo',
  templateUrl: './target-self-todo.component.html',
  styleUrls: ['./target-self-todo.component.css']
})
export class TargetSelfTodoComponent extends MyComponent {
  loadData() {
    //加载表格数据 ，使用前端分页就好
    //TODO

  }
  initSearchFields() {
    this.searchFields.set('employeeCode','员工编号');
    this.searchFields.set('employeeName','员工姓名');
  }

  //注入路由信息,以及评价的服务
  constructor( public routerInfo:ActivatedRoute,public targetService:TargetService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService,public  datePipe: DatePipe) { 
      super(routerInfo,targetService,fb,modalService,msg)
  }

  ngOnInit() {
    //初始化搜索界面
    super.initSearch();
    //初始化数据表
    super.initTable(new TargetDataSource(this.targetService));
  }

}
