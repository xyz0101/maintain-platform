import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { EvalDataSource } from 'src/app/datasource/EvalDataSource';

@Component({
  selector: 'app-ready-step-one',
  templateUrl: './ready-step-one.component.html',
  styleUrls: ['./ready-step-one.component.css']
})
export class ReadyStepOneComponent  extends MyComponent {


  //搜索条件
  searchValueCode = '';
  searchValueName = '';
 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,public msg: NzMessageService) { 
    super(routerInfo,evalService,fb,modalService,msg)
}

  ngOnInit() {
    this.curPage=1;
    super.initTable(new EvalDataSource(this.evalService));
  }
   /**
   * 加载数据
   */
  loadData() {
    //加载数据并且初始化当前的数据map,并且缓存当前数据集合
    this.dataSource.loadIncludeEmps(this.curPage+"");
 }
 /**
  * 初始化搜索
  */
 initSearchFields() {
  throw new Error("Method not implemented.");
}
/**
 * 搜索编号
 */
searchUICode(){
  this.dataSource.dataStatus.tableData = this.dataSource.dataStatus.evalMgrSubject.value;
  const data = new Array();
  var j=0;
    for(var i=0;i<this.dataSource.dataStatus.tableData.length;i++){
      if(this.dataSource.dataStatus.tableData[i].employeeCode.indexOf(this.searchValueCode)!==-1){
        data[j] =this.dataSource.dataStatus.tableData[i];
        j++;
      }
    }
  this.dataSource.dataStatus.tableData = data;
   }
   /**
 * 搜索姓名
 */
searchUIName(){
  this.dataSource.dataStatus.tableData = this.dataSource.dataStatus.evalMgrSubject.value;
  const data = new Array();
  var j=0;
    for(var i=0;i<this.dataSource.dataStatus.tableData.length;i++){
      if(this.dataSource.dataStatus.tableData[i].employeeName.indexOf(this.searchValueName)!==-1){
        data[j] =this.dataSource.dataStatus.tableData[i];
        j++;
      }
    }
  this.dataSource.dataStatus.tableData = data;
   }
 /*************************文件操作**********************************/ 
 /**
  * 导出为Excel
  */
  downloadExcel(){
    this.evalService.downLoadExcel() 
   }
   

 /**
   * 上传成功
   */
  successUpload(){
    this.loadData()
     this.msg.info("上传成功！")
  }
    /**
   * 上传失败
   */
  errorUpload(){
   
     this.msg.info("上传失败！")
  }

 




}
