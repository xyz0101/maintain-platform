import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HrDeptRegion } from 'src/app/entity/HrDeptRegion';
import { HrDeptRegionDtl } from 'src/app/entity/HrDeptRegionDtl';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { error } from 'selenium-webdriver';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { DatePipe } from '@angular/common';
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
//是否显示重置
public showReSet = false;
//是否显示搜索
public showSearch = true;

  loadData() {
    this.dataSource.loadHrDeptRegion(this.updateMap,this.curList);
 
    this.dataSource.loadHrDeptRegionDtl(this.updateMap1,this.curList1,   this.getSearchJson());
  }
  initSearchFields() {
    this.searchFields.set('date','日期指定');
  }

 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,public msg: NzMessageService,private datePipe: DatePipe) { 
    super(routerInfo,evalService,fb,modalService,msg)
}

  ngOnInit() {
    registerLocaleData(zh);
    super.initTable();
    super.initSearch();
    
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
    console.log(this.dataSource.dataStatus1.myData)
    console.log("改变")
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
    region.isAdded=true;
   
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
      regionDtl.isAdded=true;
      
      regionDtl.creationDate=new Date();
      
     
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
 searchDtl(){
   console.log(  this.getSearchJson()  )
   //加载组织线关系
   this.dataSource.loadHrDeptRegionDtl(this.updateMap1,this.curList1,   this.getSearchJson() );
   //加载组织列表
   this.dataSource.loadOgrList(  this.getSearchJson());
   this.showReSet = true;
   this.showSearch = false;

 }
 reSetDate(){
   this.validateForm.reset();
   this.showReSet = false;
   this.showSearch = true;
   //清空部门与线关系的变化数据
   this.clearDeptRegionDtlData();
 }
/**
 * 保存线
 */
 saveDeptRegion(){
  if(this.addUIList.length==0&&this.updateList.length==0&&this.deleteList.length==0){
    this.msg.info("未发生任何改动！")
  }else{
    console.log(JSON.stringify(this.addUIList))
  //获取新增的线
  //获取修改的线
  //获取删除的线
  this.evalService.saveDeptRegion(JSON.stringify(this.addUIList),JSON.stringify(this.deleteList),JSON.stringify(this.updateList)).subscribe(
    res=>{
      //清空线的变化数据
     
      this.success("保存成功！")
      this.clearDeptRegionData();
      this.dataSource.loadHrDeptRegion(this.updateMap,this.curList);
     
    },
    error=>{
      this.error("保存失败！")
    }
  )
  }



 }
 /**
  * 保存线与部门关系
 */
saveDeptRegionDtl(){
  if(this.addUIList1.length==0&&this.updateList1.length==0&&this.deleteList1.length==0){
    this.msg.info("未发生任何改动！")
  }else{
  //获取新增的部门与线的关系
  //获取修改的部门与线的关系
  /*********** 先把日期格式化 因为日期toJSON 后的格式后台无法解析 ****************/
  //同时为部门名称赋值
  this.addUIList1.forEach(item=>{
    item.bdate = this.datePipe.transform(item.bdate , 'yyyy-MM-dd')
    item.edate = this.datePipe.transform(item.edate , 'yyyy-MM-dd')
    item.creationDate = this.datePipe.transform(item.creationDate , 'yyyy-MM-dd HH:mm:ss')
    this.dataSource.dataStatus2.myData.forEach(item1=>{
      if(item1.organizationCode == item.orgCodeSecond){
        console.log("添加部门名称===>"+item1.organizationName)
        item.orgNameSecond = item1.organizationName;
      }

    })
  })
   //同时为部门名称赋值
  this.updateList1.forEach(item=>{
    item.bdate = this.datePipe.transform(item.bdate , 'yyyy-MM-dd')
    item.edate = this.datePipe.transform(item.edate , 'yyyy-MM-dd')
    this.dataSource.dataStatus2.myData.forEach(item1=>{
      if(item1.organizationCode == item.orgCodeSecond){
        item.orgNameSecond = item1.organizationName;
      }

    })
  })
 /*********** 先把日期格式化 ****************/
    this.evalService.saveDeptRegionDtl(JSON.stringify(this.addUIList1),JSON.stringify(this.deleteList1),JSON.stringify(this.updateList1)).subscribe(
      res=>{
        this.success("保存成功！")
        this.clearDeptRegionDtlData();
        this.dataSource.loadOgrList(   this.getSearchJson() )
        this.dataSource.loadHrDeptRegionDtl(this.updateMap1,this.curList1,   this.getSearchJson() );
      
      },
      error=>{
        this.error("保存失败！");
      }
    )

  }


//获取删除的部门与线的关系（保存了的数据不能删除）
//清空线的变化数据
 
}

clearDeptRegionDtlData(){
   //清空添加的数据
   this.addUIList1=this.addUIList1.filter(item=> item==null )
   //清空修改的数据
   this.updateList1=this.updateList1.filter(item=> item==null )
   this.updateMap1.clear()
   //清空删除的数据
   this.deleteList1=this.deleteList1.filter(item=> item==null )
    //清空当前的数据
    this.curList1=this.curList1.filter(item=> item==null )
   console.log("清空执行===");
  console.log(this.addUIList1)
}

clearDeptRegionData(){
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
