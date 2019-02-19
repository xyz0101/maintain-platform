import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { EvalDataSource } from 'src/app/datasource/EvalDataSource';

@Component({
  selector: 'app-ready-step-fifth',
  templateUrl: './ready-step-fifth.component.html',
  styleUrls: ['./ready-step-fifth.component.css']
})
export class ReadyStepFifthComponent extends  MyComponent {
  





  loadData() {
    this.dataSource.loadOgrLeaderList(this.updateMap,this.curList)
  }
  initSearchFields() {
    throw new Error("Method not implemented.");
  }

 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,public msg: NzMessageService) { 
    super(routerInfo,evalService,fb,modalService,msg)
}

  ngOnInit() {
this.initTable(new EvalDataSource(this.evalService))

  }
  onChange(data){
   
    setTimeout(() => {
      // console.log( "data============>",data)
      // console.log( "options============>",this.options)

       this.options.forEach(item=>{
      if(item.employeeCode==data.leaderCode){
        console.log( "当前item",item)
        data.leaderName = item.employeeName
      }
    })
     }, this.timeOutNum);  
    this.updateList = this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
   // this.options=this.options.filter(item=>item==null)
    console.log( "更新集合",this.updateList)
 
    
  }

 

  saveOrgLeaderList(){
    if(this.addUIList.length==0&&this.updateList.length==0&&this.deleteList.length==0){
      this.msg.info("未发生任何改动！")
    }else{
     

      console.log(JSON.stringify(this.addUIList))
    //获取新增的线
    //获取修改的线
    //获取删除的线
    this.evalService.saveOrgLeaderList(JSON.stringify(this.addUIList),JSON.stringify(this.deleteList),JSON.stringify(this.updateList)).subscribe(
      res=>{
        //清空线的变化数据
       
        this.success("保存成功！")
       
        //this.dataSource.loadOgrLeaderList(this.updateMap,this.curList);
        this.initTable(new EvalDataSource(this.evalService));
        this.clearData();
      },
      error=>{
        this.error("保存失败！")
      }
    )
    }
  }

  clearData(){
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
}
