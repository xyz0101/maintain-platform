import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TargetService } from 'src/app/target-service/target.service';
import { TargetDataSource } from 'src/app/datasource/TargetDataSource';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-target-self-date-maintain',
  templateUrl: './target-self-date-maintain.component.html',
  styleUrls: ['./target-self-date-maintain.component.css']
})
export class TargetSelfDateMaintainComponent extends MyComponent {
 
  public dataSource :TargetDataSource;
public loading = false;

  loadData() {
    this.dataSource.loadAuthIsOpen();
    this.dataSource.loadAllDatePoint(this.updateMap,this.curList)
  }
  initSearchFields() {
    throw new Error("Method not implemented.");
  }

  //注入路由信息,以及评价的服务
  constructor( public routerInfo:ActivatedRoute,public targetService:TargetService ,public fb: FormBuilder,
    public modalService: NzModalService,public msg: NzMessageService,public  datePipe: DatePipe) { 
      super(routerInfo,targetService,fb,modalService,msg)
  }

  ngOnInit() {

    this.initTable(new TargetDataSource(this.targetService))
  }
 /**
 * 改变行
 */
onChange(){
  console.log(this.dataSource.dataStatus1.myData)
  console.log("改变")
  this.updateList=  this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
  }
  saveSelfDate(){
    if(this.addUIList.length==0&&this.updateList.length==0&&this.deleteList.length==0){
      this.msg.info("未发生任何改动！")
    }else{
      
      console.log(JSON.stringify(this.addUIList))
    //获取新增的线
    //获取修改的线
    //获取删除的线
//格式化日期
this.updateList.forEach(item=>{
  console.log('开始时间',item.startDate)
item.startDate = this.datePipe.transform(item.startDate , 'yyyy-MM-dd')
item.creationDate = this.datePipe.transform(item.creationDate , 'yyyy-MM-dd HH:mm:ss')
item.lastUpdateDate = this.datePipe.transform(item.lastUpdateDate , 'yyyy-MM-dd HH:mm:ss')
console.log('开始时间',item.startDate)
item.endDate = this.datePipe.transform(item.endDate , 'yyyy-MM-dd')
})
    this.targetService.updateDatePoint(JSON.stringify(this.addUIList),JSON.stringify(this.deleteList),JSON.stringify(this.updateList)).subscribe(
      res=>{
        //清空线的变化数据
       
        this.success("保存成功！")
        this.clearselfDateData();
        this.dataSource.loadAllDatePoint(this.updateMap,this.curList);
       
      },
      error=>{
        this.error("保存失败！")
      }
    )
    }
  
  
  }
  clearselfDateData(): any {
    //清空添加的数据
  this.addUIList=this.addUIList.filter(item=> item==null )
  //清空修改的数据
  this.updateList=this.updateList.filter(item=> item==null )
  this.updateMap.clear()
   //清空当前的数据
   this.curList=this.curList.filter(item=> item==null )
  //清空删除的数据
  this.deleteList=this.deleteList.filter(item=> item==null )
  console.log("清空执行===");
  console.log(this.addUIList)
  }


updateAllAuth(){
  this.targetService.updateAllAuth((!this.dataSource.dataStatus1.anyData)+"").subscribe(res=>{
    if(!this.dataSource.dataStatus1.anyData)  {
      this.dataSource.dataStatus1.anyData =  !this.dataSource.dataStatus1.anyData
    this.success("权限打开成功！");
    }
    else if( this.dataSource.dataStatus1.anyData)  {
      this.dataSource.dataStatus1.anyData =  !this.dataSource.dataStatus1.anyData
    this.success("权限关闭成功！");
  }
 },
response => {
      this.error("操作失败！");
     
})

this.dataSource.loadAuthIsOpen();
  //this.dataSource.dataStatus1.anyData =  !this.dataSource.dataStatus1.anyData
  console.log(this.dataSource.dataStatus1.anyData)
}

clickSwitch(): void {
  if (!this.loading) {
    this.loading = true;
    setTimeout(() => {
      // this.switchValue = !this.switchValue;
      this.loading = false;
    }, 10);
  }

}
}
