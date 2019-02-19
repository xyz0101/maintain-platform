import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { NzModalService, UploadFile, UploadFilter, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { ReadyStepSecondComponent } from 'src/app/eval-data-ready-sub/ready-step-second/ready-step-second.component';
import { ViewChild } from '@angular/core';
 
@Component({
  selector: 'app-eval-data-ready',
  templateUrl: './eval-data-ready.component.html',
  styleUrls: ['./eval-data-ready.component.css']
})
export class EvalDataReadyComponent extends MyComponent{
  loadData() {
    throw new Error("Method not implemented.");
  }
  initSearchFields() {
    throw new Error("Method not implemented.");
  }

  current = 0;
  displayData = [];
  readyStepSecond:ReadyStepSecondComponent
  //搜索条件
  searchValue = '';
 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,public msg: NzMessageService,public router:Router   ) { 
    super(routerInfo,evalService,fb,modalService,msg)
    
}

  ngOnInit() {
   
  }
  
  /**
   * 上一步
   */
  pre(): void {
    this.current -= 1;
    this.changeContent(false);
  }
  /**
   * 下一步
   */
  next(): void {
    
    this.current += 1;
    this.changeContent(true);
  }
/**
 * 完成
 */
  done(): void {
    console.log('done');
  }
/**
 * 改变文字
 */
  changeContent(isNext:boolean): void {
    let routerPromise  ;
    switch (this.current) {
      case 0: {
        routerPromise=this.router.navigate(["/eval/ready"]) 
        this.catchRouter(routerPromise,isNext)
        break;
      }
      case 1: {
        routerPromise= this.router.navigate(["/eval/ready/stepsecond"]) 
        this.catchRouter(routerPromise,isNext)
        break;
      }
      case 2: {
         
        routerPromise=  this.router.navigate(["/eval/ready/stepthird"])
        this.catchRouter(routerPromise,isNext)
        break;
      }
      case 3: {
        routerPromise=  this.router.navigate(["/eval/ready/stepfourth"])
        this.catchRouter(routerPromise,isNext)
        break;
      }
      case 4: {
        routerPromise=  this.router.navigate(["/eval/ready/stepfifth"])
        this.catchRouter(routerPromise,isNext)
        break;
      }
      case 5: {
      
        break;
      }
      
      default: {
       
      }
    }
  }

catchRouter(routerPromise:any,isNext:boolean){
  routerPromise.then(
    res=>{
      console.log("捕获结果");
      console.log(res);
      if(!res){
         if(isNext){
        this.current-=1
      }else{
        this.current+=1
      }
      }
     
    }
  ) 
}


handleOk(){
  if(this.evalService.dataDate==null){
    this.error("未指定时间节点，请前往上一步指定时间节点")
    this.isUpdataShow = false;
    this.isOkLoading = false;
  }else{
  this.isOkLoading = true;
  this.evalService.finishEvalReady().subscribe(res=>{
    if(res.rtnCode=="S"){
      this.success("已经成功准备"+res.data+"年的年度评价数据！")
      this.isUpdataShow = false;
      this.isOkLoading = false;
    }else{
      this.error("失败，请指定时间节点！")
      this.isUpdataShow = false;
      this.isOkLoading = false;
    }   
  } ,error=>{
    this.error("失败,服务器异常")
    this.isUpdataShow = false;
    this.isOkLoading = false;
  })

}
}


 }




