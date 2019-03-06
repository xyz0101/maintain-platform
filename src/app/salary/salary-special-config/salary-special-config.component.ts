import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { SalaryDataSource } from 'src/app/datasource/SalaryDataSource';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/salary-service/salary.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { SlrSpecialList } from 'src/app/entity/SlrSpecialList';
@Component({
  selector: 'app-salary-special-config',
  templateUrl: './salary-special-config.component.html',
  styleUrls: ['./salary-special-config.component.css']
})
export class SalarySpecialConfigComponent extends MyComponent implements OnInit {
  //声明数据源
  public dataSource :SalaryDataSource;
  baseTable : Object;
  empBaseInfo: string[];
  salaryItem: string[];
  loading: boolean;
  public updateBefList: string[];

  loadData() {

    this.dataSource.loadSpecialHumanItem(this.updateMap,this.curList);
  }

  initSearchFields() {
    throw new Error("Method not implemented.");
  }

  constructor(public routerInfo: ActivatedRoute, public salaryService: SalaryService, public fb: FormBuilder, public modalService: NzModalService , public msg: NzMessageService) { 
    super(routerInfo, salaryService , fb, modalService , msg );
  }

  ngOnInit() {

    super.initTable(new SalaryDataSource(this.salaryService));
  }

  /**
   * 动态提示
   * @param data 
   */
  onChange(data): void {
     //延迟执行
     setTimeout(() => {
      if(data!=undefined)
      this.options.forEach(item=>{
     if(item.employeeCode==data.employeeCode){
       //console.log( "当前item",item)
       data.employeeName = item.employeeName
     }
   })
    }, this.timeOutNum);  
    
    //console.log('curList',this.dataSource.dataStatus.tableData);  
    this.updateList=  this.changeStatu(this.curList,this.updateMap,this.updateList,this.dataSource.dataStatus)
    console.log('updateList',this.updateList);  

}


/**
 * 增加一条记录
 */
  addRecord(): void{
    const slrSpecialList= new SlrSpecialList();
   //这个赋值顺序会影响到是否有重复数据的判断
   //因此顺序不能改变
    slrSpecialList.specialType='';
    slrSpecialList.employeeCode='';
    slrSpecialList.salaryCode='';
    slrSpecialList.salaryName='';
    slrSpecialList.employeeName='';
    slrSpecialList.specialId=new Date().getTime()

    this.addUIRow(this.addUIList,this.dataSource.dataStatus,slrSpecialList);


    
  }

  /**
   * 删除配置信息表中的数据
   * @param data
   */
  deleteCurRecord(data){
    this.addUIList=this.deleteRow(this.deleteList,this.dataSource.dataStatus,JSON.stringify(data),this.addUIList);
  }


  /***
   * 数据在add,update,delete后提交到数据库保存
   */
  saveUpdate(){
    console.log('数组 ===>',this.addUIList,this.updateList,this.deleteList)
    if(this.addUIList.length==0&&this.updateList.length==0&&this.deleteList.length==0){
      this.msg.info("未发生任何改动！")
    }else{
      const newArr = JSON.parse(JSON.stringify(this.dataSource.dataStatus.tableData) )   ;
      const newSet = new Set();
      newArr.forEach(item=>{
        item.specialId=-1;
        item.salaryName="null"
        newSet.add( JSON.stringify(item) );
      })
      console.log('数组大小===>',newArr.length)
      console.log('Set大小===>',newSet.size)
    
     
      
      if(newArr.length!=newSet.size){
        this.warning();
      }else{
        this.salaryService.saveSpecialUpdateInfo(JSON.stringify(this.updateList),
        JSON.stringify(this.deleteList),
        JSON.stringify(this.addUIList)).subscribe(data =>{
          this.clearData();
          this.loadData();
          this.success("数据保存成功");
        },error=>{
          this.error("数据保存失败");
        })

      }
    }
  }

  warning(): void {
    this.modalService.warning({
      nzTitle: '信息提示',
      nzContent: '存在重复的数据，请检查!'
    });
  }

  /**
   * 清空集合
   */
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
