import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { Params } from '@angular/router/src/shared';
import { PageInfo } from 'src/app/entity/PageInfo';
import {MatTableModule} from '@angular/material/table';
import { EvalMgrYear } from 'src/app/entity/EvalMgrYear';
import { EvalDataSource } from 'src/app/datasource/EvalDataSource';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/entity/Result';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup,FormBuilder ,FormControl} from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { MyComponent } from 'src/app/comps/MyComponent';

@Component({
  selector: 'app-eval-maintain',
  templateUrl: './eval-maintain.component.html',
  styleUrls: ['./eval-maintain.component.css']
})
export class EvalMaintainComponent extends MyComponent    {
  
 
 
  //注入路由信息,以及评价的服务
  constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService) { 
      super(routerInfo,evalService,fb,modalService,msg)
  }
 
  ngOnInit() {
    //初始化搜索界面
    super.initSearch();
    //初始化职等下拉列表
    this.initEmpLevelList();
    //初始化数据表
    super.initTable(new EvalDataSource(this.evalService));
  
  }
  /**
   * 加载数据方法
   */
  loadData() {
    //加载数据并且初始化当前的数据map,并且缓存当前数据集合
  this.dataSource.loadEval(this.curPage+"",this.updateMap,this.curList, JSON.stringify(this.validateForm.value),this.sortKey,this.sortValue);
 }
 /**
  * 初始化搜索
  */
 initSearchFields() {
  this.searchFields.set('employeeCode','员工编号');
  this.searchFields.set('employeeName','员工姓名');
  this.searchFields.set('orgFullName','所属组织');
  this.searchFields.set('employeeLevel','员工等级');
  this.searchFields.set('levelFirst','一次评价得分');
 // this.searchFields.set('mgrCode','上级编号');
  this.searchFields.set('mgrName','上级姓名');
 // this.searchFields.set('statu','评价状态');
 // this.searchFields.set('firstSubmit','上级提交状态');
}

onChange(){
this.updateList= this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
console.log("之后集合")
  console.log(this.updateList)
}
}
