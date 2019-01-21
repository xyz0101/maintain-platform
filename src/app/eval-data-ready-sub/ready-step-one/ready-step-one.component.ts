import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EvalServiceService } from 'src/app/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-ready-step-one',
  templateUrl: './ready-step-one.component.html',
  styleUrls: ['./ready-step-one.component.css']
})
export class ReadyStepOneComponent  extends MyComponent {


  //搜索条件
  searchValueCode = '';
  searchValueName = '';
 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,private msg: NzMessageService) { 
    super(routerInfo,evalService,fb,modalService)
}

  ngOnInit() {
    this.curPage=1;
    super.initTable();
  }
   /**
   * 加载数据
   */
  loadData() {
    //加载数据并且初始化当前的数据map,并且缓存当前数据集合
    this.dataSource.loadIncludeEmps(this.curPage+"");
 }
 /**
  * 初始化搜索
  */
 initSearchFields() {
  throw new Error("Method not implemented.");
}
/**
 * 搜索编号
 */
searchUICode(){
  this.dataSource.myData = this.dataSource.evalMgrSubject.value;
  const data = new Array();
  var j=0;
    for(var i=0;i<this.dataSource.myData.length;i++){
      if(this.dataSource.myData[i].employeeCode.indexOf(this.searchValueCode)!==-1){
        data[j] =this.dataSource.myData[i];
        j++;
      }
    }
  this.dataSource.myData = data;
   }
   /**
 * 搜索姓名
 */
searchUIName(){
  this.dataSource.myData = this.dataSource.evalMgrSubject.value;
  const data = new Array();
  var j=0;
    for(var i=0;i<this.dataSource.myData.length;i++){
      if(this.dataSource.myData[i].employeeName.indexOf(this.searchValueName)!==-1){
        data[j] =this.dataSource.myData[i];
        j++;
      }
    }
  this.dataSource.myData = data;
   }
 
/*************************文件操作**********************************/ 

filters: UploadFilter[] = [
  {
    name: 'type',
    fn  : (fileList: UploadFile[]) => {
  
      const filterFiles =[];
      var i=0;
      fileList.forEach((vaule:UploadFile,index :number)=>{
        console.log(vaule.type)
        console.log('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'.indexOf(vaule.type))
        if(vaule.type!=null&&vaule.type!=''&& ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'.indexOf(vaule.type)>-1 ||
        'application/vnd.ms-excel'.indexOf(vaule.type)>-1 )){
         
          filterFiles[i]=vaule;
          i++;
        }
      })
    if (filterFiles.length !== fileList.length) {
       this.msg.error(`包含文件格式不正确，只允许上传Excel表格`);
       return filterFiles;
     }
      return fileList;
    }
  },
  {
    name: 'async',
    fn: (fileList: UploadFile[]) => {
      return new Observable((observer: Observer<UploadFile[]>) => {
        // doing
        observer.next(fileList);
        observer.complete();
      });
    }
  }
];

fileList = [];

// tslint:disable-next-line:no-any
handleChange(info: any): void {
  const fileList = info.fileList;
  // 2. read from response and show file link
  if (info.file.response) {
    info.file.url = info.file.response.url;
  }
  // 3. filter successfully uploaded files according to response from server
  this.fileList = fileList.filter(item => {
    if (item.response) {


      return item.response.status === 'success';
    }
    return true;
  });
}

}
