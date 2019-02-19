import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import zh from '@angular/common/locales/zh';
import { Observable, Observer } from 'rxjs';
import { EventEmitter } from 'events';
import { HttpEventType } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { EvalDataSource } from 'src/app/datasource/EvalDataSource';
@Component({
  selector: 'app-ready-step-third',
  templateUrl: './ready-step-third.component.html',
  styleUrls: ['./ready-step-third.component.css']
})
export class ReadyStepThirdComponent  extends MyComponent {
  
   //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,public msg: NzMessageService,private datePipe: DatePipe) { 
    super(routerInfo,evalService,fb,modalService,msg)
}


  loadData() {
     this.dataSource.loadEvalDistQuota(  this.getSearchJson() ,this.updateMap,this.updateList)
  }
  initSearchFields() {
    this.searchFields.set('dataDate','日期指定');
  }
  

private jobLevelArray=[
  {jobLevel:'1',jobLevelName:'1'},
  {jobLevel:'2',jobLevelName:'2'},
  {jobLevel:'3',jobLevelName:'3'},
  {jobLevel:'4',jobLevelName:'4'},
  {jobLevel:'5',jobLevelName:'5'},
  
]

//是否显示重置
public showReSet = false;
//是否显示搜索
public showSearch = true;
//上传评语分布率
public uploadDistQuotaUrl=this.evalService.uploadDistQuotaUrl;

  ngOnInit() {
    this.initTable(new EvalDataSource(this.evalService));
    super.initSearch();
    
  }
 
  searchQuota(){
    console.log(  this.getSearchJson()  )
    //加载评语分布率
    this.dataSource.loadEvalDistQuota(   this.getSearchJson(),this.updateMap,this.curList );
    //加载组织列表
    this.dataSource.loadOgrList(  this.getSearchJson());
    this.showReSet = true;
    this.showSearch = false;
 
  }
  reSetDate(){
    this.validateForm.reset();
    this.showReSet = false;
    this.showSearch = true;
    //清空评语分布率的变化数据
    this.clearEvalDistQuotaData();
  }
  clearEvalDistQuotaData() {
  //清空修改的数据
  this.updateList=this.updateList.filter(item=> item==null )
  this.updateMap.clear()
   //清空当前的数据
   this.curList=this.curList.filter(item=> item==null )
  console.log("清空执行===");
 }

  /**
  * 导出为Excel
  */
  downloadExcel(){
    console.log("导出执行===条件==="+this.getSearchJson());
    this.evalService.exportEvalDistQuota(this.getSearchJson()); 
   }
   /**
    * 当文件变化
    * @param info 
    */
   handleChange(info: any): void {
    
   
    console.log(this.uploadDistQuotaUrl)
    var item = info.fileList[info.fileList.length-1];
    if (item!=null&&item.status=='done') {
      this.clearEvalDistQuotaData()
      this.dataSource.loadEvalDistQuota(this.getSearchJson(),this.updateMap,this.curList);
      this.msg.info("上传成功！")
      
    } 
   
  }
  /**
   * 上传成功
   */
  successUpload(){
    this.clearEvalDistQuotaData()
    this.dataSource.loadEvalDistQuota(this.getSearchJson(),this.updateMap,this.curList);
    this.msg.info("上传成功！")
  }
    /**
   * 上传失败
   */
  errorUpload(){
    this.clearEvalDistQuotaData()
   // this.dataSource.loadEvalDistQuota(this.getSearchJson(),this.updateMap,this.curList);
    this.msg.info("上传失败！")
  }
  
   
  /**
   * 、日期变化
   * @param result 
   */
  dateChange(result: Date){
    console.log("日期变化",result)
    if(result!=null)
  this.uploadDistQuotaUrl= this.evalService.uploadDistQuotaUrl + result.getTime();
  }
/**
 * 改变行
 */
onChange(){
  this.updateList=  this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
  }

saveEvalDistQuota(){
  console.log(this.updateList)
  if(this.addUIList.length==0&&this.updateList.length==0&&this.deleteList.length==0){
    this.msg.info("未发生任何改动！")
  }else{
    console.log(JSON.stringify(this.updateList))
  //获取新增的评语分布率
  //获取修改的评语分布率
  //获取删除的评语分布率
  this.evalService.saveEvalDistQuota(JSON.stringify(this.addUIList),JSON.stringify(this.deleteList),JSON.stringify(this.updateList)).subscribe(
    res=>{
      //清空线的变化数据
     
      this.success("保存成功！")
      this.clearEvalDistQuotaData()
      this.dataSource.loadEvalDistQuota(this.getSearchJson(),this.updateMap,this.curList);
     
    },
    error=>{
      this.error("保存失败！")
    }
  )
  }

}

}
