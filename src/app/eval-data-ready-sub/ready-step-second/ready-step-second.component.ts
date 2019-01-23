import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HrDeptRegion } from 'src/app/entity/HrDeptRegion';
import { HrDeptRegionDtl } from 'src/app/entity/HrDeptRegionDtl';

@Component({
  selector: 'app-ready-step-second',
  templateUrl: './ready-step-second.component.html',
  styleUrls: ['./ready-step-second.component.css']
})
export class ReadyStepSecondComponent extends MyComponent {

//缓存的当前列表的map
public curList1 = new Array<any>();
//修改过的数据的map
public updateMap1 = new Map<string,any>();
//修改过的数据的集合
public updateList1 =  [];

//前端添加的集合
public addUIList1 =  [];
//需要向后端删除的集合
public deleteList1 =  [];

  loadData() {
    this.dataSource.loadHrDeptRegion(this.updateMap,this.curList);
    this.dataSource.loadHrDeptRegionDtl(this.updateMap1,this.curList1);
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
    super.initTable();
  }

/**
 * 改变行
 */
  onChange(){
  this.updateList=  this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
  }
  /**
 * 改变行
 */
  onChange1(){
    this.updateList1=  this.changeStatu(this.curList1,this.updateMap1,this.updateList1,this.dataSource.dataStatus1)
    }
    /**
     * 添加行
     */
  addRow(){
    let region= new HrDeptRegion()

    
    region.drCode=this.getNewDrCode();
    region.drName="";
    region.drMgr="";
    region.drMgrName="";
   
    this.addUIRow(this.addUIList,this.dataSource.dataStatus, JSON.parse(JSON.stringify(region)));
   // console.log(this.dataSource.dataStatus.myData)
  }
  /**
   * 删除行
   */
  deleteUIRow(row){
    this.addUIList=  this.deleteRow(this.deleteList,this.dataSource.dataStatus, JSON.stringify(row),this.addUIList);
    

  }



 /**
     * 添加行
     */
    addRow1(){
      let regionDtl= new HrDeptRegionDtl()
  
      
      regionDtl.drCode="";
      regionDtl.drName="";
      regionDtl.lastUpdateDate=new Date();
     
      this.addUIRow(this.addUIList1,this.dataSource.dataStatus1, JSON.parse(JSON.stringify(regionDtl)));
     // console.log(this.dataSource.dataStatus.myData)
    }
    /**
     * 删除行
     */
    deleteUIRow1(row){
    this.addUIList1=  this.deleteRow(this.deleteList1,this.dataSource.dataStatus1, JSON.stringify(row),this.addUIList1);
    }


  /**
   * 获取新增的线编号
   */
  getNewDrCode():string{
    var tempCode=0;
    if(this.addUIList.length==0){
      this.dataSource.dataStatus.myData.forEach(item=>{
        var code = new String( item.drCode).substr(4, item.drCode.length);
        var codeNum = Number.parseInt(code);
        if(codeNum>=tempCode){
          tempCode=codeNum;
        }
         

      } )
    }else{
      this.addUIList.forEach(item=>{
        var code = new String( item.drCode).substr(4, item.drCode.length);
        var codeNum = Number.parseInt(code);
        if(codeNum>=tempCode){
          tempCode=codeNum;
        }
        

      } )
    }
    return "DR00"+(tempCode+1);
  }
}
