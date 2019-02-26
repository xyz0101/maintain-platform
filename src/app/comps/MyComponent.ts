import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 import { Params } from '@angular/router/src/shared';
import { PageInfo } from 'src/app/entity/PageInfo';
import {MatTableModule} from '@angular/material/table';
 import { EvalDataSource } from 'src/app/datasource/EvalDataSource';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/app/entity/Result';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup,FormBuilder ,FormControl} from '@angular/forms';
import { NzModalService, NzMessageService, UploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd';
import { saveAs } from 'file-saver';
import { ResponseContentType } from '@angular/http';
import { Observer } from 'rxjs';
import { DataStatus } from 'src/app/entity/DataStatus';
import { async } from '@angular/core/testing';
import { HttpEventType } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import {TargetDataSource} from '../datasource/TargetDataSource';
export abstract class MyComponent implements    OnInit {
  errorUpload(): any {
    throw new Error("Method not implemented.");
  }
  successUpload(): any {
    throw new Error("Method not implemented.");
  }
  //延迟时间
  public timeOutNum=200;
  //输入员工的自动提示
 public options=[];
 //当前页码
 public curPage :number=1;
 //分页信息
 public pageInfo:PageInfo;
 //缓存的当前列表的map
 public curList = new Array<any>();
 //修改过的数据的map
 public updateMap = new Map<string,any>();
 //修改过的数据的集合
 public updateList =  [];
 //前端添加的集合
 public addUIList =  [];
  //需要向后端删除的集合
  public deleteList =  [];
 //对话框是否可见
 public  isUpdataShow=false;
 //是否正在确认
 public isOkLoading = false;
 //已修改的数据的当前页
 public updateCurPage=1;
 //数据源1
 public dataSource: EvalDataSource;

 //搜索的字段
 public  searchFields  =new Map();
 //构造搜索表单
 public validateForm: FormGroup;
 //搜索条件json串
 public searchJson="{'null':null}";
 //条件元素列表
 public controlArray = [];
 //是否展开
 public isCollapse = true;
 //职等下拉列表
 public empLevelList=[];
 //搜索条件默认展示多少个 ，默认值3
 public searchFieldsLimitForRow =3;

 //排序条件
 public sortValue = null;
 public sortKey = null;
 public fileList = [];
 //文件过滤器
 public filters: UploadFilter[];




 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
   public modalService: NzModalService,public msg: NzMessageService) {
 
 }
 public setSearchFieldsLimitForRow(value:number){
   this.searchFieldsLimitForRow =value;
 }


 abstract ngOnInit();

/**
 * 初始化表格
 */
initTable(dataSource: EvalDataSource) {
     // 初始化数据源
     this.dataSource = dataSource;
     // 获取路由信息中的订阅参数
     this.routerInfo.params.subscribe((params: Params) => {
       // 获取页码
       //  this.curPage=params["curPage"];
     })
     // 加载数据
     this.loadEvalByPage(this.curPage + '');
}
/**
 * 初始化搜索
 */
  initSearch() {
    // 初始化搜索字段
    this.initSearchFields();
    // 构建表单
    this.construtSearch();
  }

/**
  * 从服务器端获取数据
  * @param curPage
  */
 loadEvalByPage(curPage: string){
   if (curPage == null) {
     this.curPage = 1;
   } else {
     this.curPage = parseInt (curPage) ;
   }
   console.log(curPage);
   // 置空当前数据集合
     this.curList = this.curList.filter(d => d == null);
   // 加载数据
   this.loadData();
   console.log('当前集合');
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
         this.success(null);
         this.completedUpdate();
   },
   response => {
         this.error(null);
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
     c.show = this.isCollapse ? (index < this.searchFieldsLimitForRow) : true;
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
     this.controlArray.push({ index: i, show: i < this.searchFieldsLimitForRow ,val:value,field:key});
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
   this.loadEvalByPage(this.dataSource.dataStatus.pageInfo.curPage.toString());
 
   console.log(this.sortKey+"    "+this.sortValue);

 }
 /**
  * 改变数据状态
  * 按照 Angular 的设计，当需要对 nzData 中的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
  */
  changeStatu(curList:Array<any> , updateMap:Map<string,any>,updateList :Array<any>,dataStatus:DataStatus ):any[] {
    //需要添加延迟，在使用ngModelChange的时候变化时发生在改变数据的同时，在执行这里的饿时候数据还没有变化，所以要等待数据变化之后在比较
    window.setTimeout(() => {
    // console.log(curList)
    // console.log(dataStatus.myData )
    //遍历原始表
     for(var i=0;i<curList.length;i++){
       var key=   JSON.stringify (curList[i]);
      //  console.log("key====》",curList[i])
      //  console.log("value====》", dataStatus.myData[i] )
         if(key!=   JSON.stringify (dataStatus.myData[i])){
           if(dataStatus.myData[i]!=undefined){
            //  console.log("发生了变化")
            //  console.log("key====》"+key)
            //  console.log("value====》"+JSON.stringify (dataStatus.myData[i]))
             updateMap.set(key,dataStatus.myData[i]);
           }
           
         }else{
          // console.log("变化复原")
          //console.log("key====》"+key)
            updateMap.delete(key);
         }
     } 
    // 删除数据
      updateList=updateList.filter(d => d ==null );
     var i=0;
     updateMap.forEach((value,key)=>{
    // 增加数据
    if(value!=null&&value!=undefined){
      updateList[i]=value;
        i++;
    }
     
     })
     console.log("变化的集合")
     console.log(updateList)
     console.log(this.addUIList)
     console.log(this.updateMap)
     this.updateList=updateList;


    }, this.timeOutNum);
    console.log("延迟完成")
     return updateList;
   
 }
 success(txt): void {
   this.modalService.success({
     nzTitle: '提示信息',
     nzContent: txt==null? '修改信息成功':txt
   });
 }
 
 error(txt): void {
   this.modalService.error({
     nzTitle: '错误信息',
     nzContent: txt==null?'修改信息失败':txt
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
    this.loadEvalByPage(this.dataSource.dataStatus.pageInfo.curPage+"")
 }
 
/**
 * 添加行
 * @param addUIList 
 * @param dataStatus 
 * @param row 
 */
addUIRow(addUIList:Array<any>,dataStatus: DataStatus,row: any){
  let i=0;
  var tempList = []
  for(;i<dataStatus.myData.length;i++){
    tempList[i]= dataStatus.myData[i];
  }
  tempList[i]=row;
  dataStatus.myData=tempList;
  addUIList.push(row);
  console.log("添加行")
  console.log(addUIList)
}
/**
 * 删除行
 * @param deleteList 
 * @param dataStatus 
 * @param row 
 * @param addList 
 */
deleteRow(deleteList:Array<any> , dataStatus: DataStatus,row: any,addList:Array<any>):any[]{
  dataStatus.myData=dataStatus.myData.filter(item=> {
    new Date( item.creationDate) 
    
    return JSON.stringify(item)!=row
  }
    
   )
  var hasAdd = false;
  addList.forEach(item=>{
    if( JSON.stringify(item)==row){
      console.log("是添加的行")
      hasAdd=true;
      
    }
  })
  addList= addList.filter(item=>{
    return JSON.stringify(item)!=row
  })
  if(!hasAdd){
    let i=0;
    for(;i<deleteList.length;i++){
      deleteList[i]= deleteList[i];
    }
    
    deleteList[i]=JSON.parse(row) ;
  }

  console.log("删除行")
  console.log(addList)
return addList;
}
/**
 * 获取搜索的条件
 */
getSearchJson():string{
 return JSON.stringify((this.validateForm==undefined||this.validateForm==null) ? {'null':null}: this.validateForm.value) ;
}

/**
 * 
 * @param data 输入员工编号时候
 * @param event 
 */
 onChangeEmp(event:string) {
  this.loadInputEmps(event)
 }
/**
 * 加载输入的员工提示
 */
loadInputEmps(inputValue:string){
this.evalService.getInputEmpList(inputValue).subscribe(
  res=>{
    this.options=res;
  }
)
}

public customReq = (item: UploadXHRArgs) => {
  
  // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
  return   this.evalService.uploadExcel(item).subscribe((event: HttpEvent<{}>) => {
    if (event.type === HttpEventType.UploadProgress) {
      if (event.total > 0) {
        // tslint:disable-next-line:no-any
        (event as any).percent = event.loaded / event.total * 100;
      }
      // 处理上传进度条，必须指定 `percent` 属性来表示进度
      item.onProgress(event, item.file);
    } else if (event instanceof HttpResponse) {
      // 处理成功
      item.onSuccess(event.body, item.file, event);
      this.successUpload();
      
    }
  }, (err) => {
    // 处理失败
    item.onError(err, item.file);
    this.errorUpload();
  });
}













}
