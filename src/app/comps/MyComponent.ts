import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service.service';
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
import { NzModalService } from 'ng-zorro-antd';

export abstract class MyComponent implements    OnInit {


 //当前页码
 public curPage :number=1;
 //分页信息
 public pageInfo:PageInfo;
 //缓存的当前列表的map
 public curList = new Array<EvalMgrYear>();
 //修改过的数据的map
 public updateMap = new Map<string,EvalMgrYear>();
 //修改过的数据的集合
 public updateList = new Array<EvalMgrYear>();
 //对话框是否可见
 public  isUpdataShow=false;
 //是否正在确认
 public isOkLoading = false;
 //已修改的数据的当前页
 public updateCurPage=1;
 //数据源
 public dataSource :EvalDataSource;
 //搜索的字段
 public  searchFields  =new Map();
 //构造搜索表单
 public validateForm: FormGroup;
 //条件元素列表
 public controlArray = [];
 //是否展开
 public isCollapse = true;
 //职等下拉列表
 public empLevelList=[];
 //排序条件
 public sortValue = null;
 public sortKey = null;

 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
   public modalService: NzModalService) { 
 
 }

 abstract ngOnInit();

/**
 * 初始化表格
 */
initTable(){
     //初始化数据源
     this.dataSource = new EvalDataSource(this.evalService);
     //获取路由信息中的订阅参数
     this.routerInfo.params.subscribe((params:Params)=>{
         //获取页码  
       //  this.curPage=params["curPage"];
     })
     //加载数据
     this.loadEvalByPage(this.curPage+"");
}
/**
 * 初始化搜索
 */
  initSearch(){
    //初始化搜索字段
    this.initSearchFields();
    //构建表单
    this.construtSearch();
  }

/**
  * 从服务器端获取数据
  * @param curPage 
  */
 loadEvalByPage(curPage:string){
   if(curPage==null){
     this.curPage=1;
   }else{
     this.curPage=  parseInt(curPage) ;
   }
   console.log(curPage);
   //置空当前数据集合
     this.curList=this.curList.filter(d => d.employeeCode ==null);
   //加载数据
   this.loadData();
   console.log(this.curList);
 }
 abstract loadData();


 /**
  * 取消
  */
 cancelUpdate(){
   this.isUpdataShow=false;
 }
 /**
  * 确认
  */
 okUpdate(){
   this.isOkLoading = true;
   //处理确认
  this.evalService.updateEval(JSON.stringify(this.updateList)).subscribe( 
   val => { 
         this.success();
         this.completedUpdate();
   },
   response => {
         this.error();
         this.completedUpdate();
   } 
 );
       

 }
 /**
  * 展示修改对话框
  */
 showUpdateDialog(): void {
   this.isUpdataShow = true;
 }
 /**
  * 初始化搜索字段
  */
 abstract initSearchFields();
 //展开高级搜索 ，默认显示三个
 toggleCollapse(): void {
   this.isCollapse = !this.isCollapse;
   this.controlArray.forEach((c, index) => {
     c.show = this.isCollapse ? (index < 3) : true;
   });
 }
 /**
  * 重置表单
  */
 resetForm(): void {
   this.validateForm.reset();
 }
 /**
  * 构建搜索表单
  */
 construtSearch(){
   this.validateForm = this.fb.group({});
   var i=0;
   this.searchFields.forEach((value , key) =>{
     this.controlArray.push({ index: i, show: i < 3 ,val:value,field:key});
     this.validateForm.addControl(key, new FormControl());
     i++;
   });   
 }
 /**
  * 初始化职等下拉列表
  */
 initEmpLevelList(){
   const children = [];
   for (let i = 1; i <= 10; i++) {
     children.push({ label: i, value: i });
   }
   this.empLevelList = children;
 }
 /**
  * 搜索按钮点击
  */
 searchEval(){
    //执行查询
    this.loadEvalByPage("1");

   console.log(JSON.stringify(this.validateForm.value));
 }
 /**
  * 排序
  * @param sort 
  */
 sort(sort: { key: string, value: string }): void {
   this.sortKey = sort.key;
   this.sortValue = sort.value;
   //执行查询
   this.loadEvalByPage(this.dataSource.pageInfo.curPage.toString());
 
   console.log(this.sortKey+"    "+this.sortValue);

 }
 /**
  * 改变数据状态
  * 按照 Angular 的设计，当需要对 nzData 中的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
  */
 changeStatu(){
   //console.log(this.dataSource.evalMgrSubject.value)
   console.log(this.curList)
   //遍历原始表
     for(var i=0;i<this.curList.length;i++){
       var key= this.dataSource.getKey(this.curList[i]);
      // console.log(this.dataSource.evalMgrSubject.value[i])
         if(key!=  this.dataSource.getKey(this.dataSource.evalMgrSubject.value[i])){
           this.updateMap.set(key,this.dataSource.evalMgrSubject.value[i]);
         }else{
           this.updateMap.delete(key);
         }
     } 
    // this.updateList.splice(0,this.updateList.length);
        // 删除数据
        this.updateList=this.updateList.filter(d => d.employeeCode ==null);
     var i=0;
     this.updateMap.forEach((value,key)=>{
   // 增加数据
       this.updateList[i]=value;
       i++;
     })
     console.log(this.updateList)
   
 }
 success(): void {
   this.modalService.success({
     nzTitle: '提示信息',
     nzContent: '修改信息成功'
   });
 }

 error(): void {
   this.modalService.error({
     nzTitle: '错误信息',
     nzContent: '修改信息失败'
   });
 }
 /**
  * 取消已修改的数据
  */
 completedUpdate(){
    // 删除数据
    this.updateList=this.updateList.filter(d => d.employeeCode ==null);
    this.updateMap.clear();
    this.isUpdataShow = false;
    this.isOkLoading = false;
    this.loadEvalByPage(this.dataSource.pageInfo.curPage+"")
 }


}
