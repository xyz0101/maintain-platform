import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EvalServiceService } from 'src/app/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
 
@Component({
  selector: 'app-ready-step-fourth',
  templateUrl: './ready-step-fourth.component.html',
  styleUrls: ['./ready-step-fourth.component.css']
})
export class ReadyStepFourthComponent extends MyComponent {
  private processRate = 0;
  private executorId = null;
  private showRefresh = true;;
  private showProcess = false;
  private isRefreshing = true;
  /**
   * 加载数据
   */
  loadData() {
    this.dataSource.loadEvalEmployeeInfos(this.getSearchJson(),this.curPage+"")
  }
  /**
   * 初始化搜索字段
   */
  initSearchFields() {
    this.searchFields.set('dataDate','时间节点');
    this.searchFields.set('employeeCode','员工编号');
    this.searchFields.set('employeeName','员工姓名');
    this.searchFields.set('orgNameSecond','所属组织');
    
  }

  //注入路由信息,以及评价的服务
  constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService) { 
      super(routerInfo,evalService,fb,modalService,msg)
  }

  ngOnInit() {
    //初始化进度
    this.getProcessRate()
    this.initSearchFields();
    //设置搜索条件展示数量
    super.setSearchFieldsLimitForRow(4)
    super.initSearch();
    //设置时间必填
    this.validateForm.setControl("dataDate", new FormControl(null,Validators.required))

    //初始化表格
    super.initTable();
  this.searchEval()   

  }
  /**
   * 搜索评价人员信息
   */
searchEvalEmployeeInfos(){
  var canSearch = true;
  for (const i in this.validateForm.controls) {
    this.validateForm.controls[ i ].markAsDirty();
    this.validateForm.controls[ i ].updateValueAndValidity();
  }
  console.log( "状态====",this.validateForm.status)
  if( this.validateForm.status== "VALID"){
      this.searchEval()
  }
}
/**
 * 刷新数据
 */
refreshData(){
if(this.validateForm.value.dataDate!=null){
  this.startRefresh();
}else{
  console.error("没有输入时间")
}
}



/**
 * 点击按钮确认就开始调用刷新程序
 * 返回结果如果不是null 那么就执行成功，将id保存，并且将状态改为开始
 * 保存之后开始定时获取进度
 */
startRefresh(){
  this.evalService.callRefreshEvalData(this.getSearchJson()).subscribe(
    res=>{
      console.log("刷新程序的id==",res.data)
      if(res.data!=null&&res.data!="null"){
        this.executorId = res.data;
        //获取进度，显示进度条
         if(this.isRefreshing == false){
           this.getProcessRate()
         }
       }
    }
  )
}

/**
 * 定时获取进度
 */
getProcessRate(){
  var index =1
 var interval = setInterval(() => {
  console.log("当前的id==",this.executorId)
    this.evalService.getProcessRate(this.executorId).subscribe(res=>{
      console.log("获取进程结果==",res)
      if("E"==res.rtnCode){
        console.log(1)
        this.error(res.rtnMsg);
        this.showRefresh = true;
        clearInterval(interval)
        this.isRefreshing = false;
      }else if("S"==res.rtnCode){
        console.log(2)
        if("null"!=res.data){
           this.processRate = res.data;
           this.showRefresh = true;
           this.success(res.rtnMsg);
           clearInterval(interval)
           this.isRefreshing = false;
        }
      }else{
        console.log(3)
          if("null"!=res.data&&res.data>0){
            console.log(4)
            if(this.executorId==null||this.executorId==''){
              this.executorId = res.rtnMsg;
            }
 
            this.processRate = res.data;
            this.showProcess=true;
            this.showRefresh = false;
            if(index>300){
              clearInterval(interval)
             }
            
          }
        }
    })

  },1000)


}

}
