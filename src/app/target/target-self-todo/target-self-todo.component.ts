import {Component, Input, OnInit} from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { TargetDataSource } from 'src/app/datasource/TargetDataSource';
import { ActivatedRoute } from '@angular/router';
import { TargetService } from 'src/app/target-service/target.service';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import {EvalVirtProc} from '../../entity/EvalVirtProc';

@Component({
  selector: 'app-target-self-todo',
  templateUrl: './target-self-todo.component.html',
  styleUrls: ['./target-self-todo.component.css']
})
export class TargetSelfTodoComponent extends MyComponent {
  //声明数据源
  public dataSource :TargetDataSource;
  private filed1: string;
  private filed2: string;
  private tableSource: Object;
  private flag: boolean;
  // 注入路由信息,以及评价的服务
  constructor( public routerInfo: ActivatedRoute , public targetService: TargetService , public fb: FormBuilder,
    public modalService: NzModalService, public msg: NzMessageService, public  datePipe: DatePipe) {
    super(routerInfo, targetService , fb, modalService , msg );
  }
  @Input()
  private year = '2018';
  private data: Object;
  private controlData: Array<any>;

  private allChecked = false;
  dataSet: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  //全选样式 控制
  indeterminate = false;

  onChange(result: Date): void {
    this.year = result.getFullYear() + '';
    this.loadData();
    console.log('onChange: ', this.year);
  }

  refreshStatus(): void {
      // @ts-ignore
    const allChecked = this.dataSource.dataStatus.anyData.every(value => value.checked === true);
    const allUnChecked = this.dataSource.dataStatus.anyData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    // @ts-ignore
    this.dataSource.dataStatus.anyData.forEach(data => {
      if ( null != data.q1t && null != data.q2t && null != data.q3t && null != data.q4t) {
      } else {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  loadData() {
    // 加载表格数据 ，使用前端分页就好
    // @ts-ignore
    this.dataSource.loadTodoList(this.year);
    // @ts-ignore
    // TODO

  }
  initSearchFields() {
    this.searchFields.set('employeeCode', '员工编号');
    this.searchFields.set('employeeName', '员工姓名');
  }
  ngOnInit() {
    // 初始化搜索界面
    super.initSearch();
    // 初始化数据表
    super.initTable(new TargetDataSource(this.targetService));
    //初始化刷新全选状态
    this. refreshStatus();
  }

  selectTest(label: string) {
    const params = new Array();
    // @ts-ignore
    this.dataSource.getEnddate(label.substring(2)).subscribe (datas => {
      // ******
        // @ts-ignore
      this.dataSource.dataStatus.anyData.forEach(data => {
      if (data.checked ) {
        if (label.substring(2) == '1' || label.substring(2) == '3' && data.tarTemplate == '2') {

        } else {
          const entity = new EvalVirtProc();
        entity.empCode = data.employeeCode;
        if (data.tarTemplate == 1) {
          entity.enddate = datas.type1;
        } else {
          entity.enddate = datas.type2;
        }
        entity.date = this.year;
        entity.label = label;
        params.push(entity);
      }
      }
    });
       if (params.length < 1) {
      this.warning();
      return;
    }
       // @ts-ignore
       this.dataSource.insertBpmVirtRecord(JSON.stringify(params)).subscribe(data => {
      if ( data > 0) {
        this.success();
        this.loadData();
      }
    });
       // ***
    });
  }
  // delete
  deleteTest(code: string) {
    const param = new Array() ;
      // @ts-ignore
    this.dataSource.dataStatus.anyData.forEach(data => {
      if (data.checked) {
        const parr = [data.instanceid1, data.instanceid2, data.instanceid3, data.instanceid4];
        const entrys = new TempEntity();
        entrys.setEmployeeCode(data.employeeCode);
        entrys.setCode(this.year + '年第' + code.substring(0, 1) + '季度自评');
        // @ts-ignore
        param.push(entrys);
      }
    });
    if (param.length < 1) {
      this.warning();
      return;
    }
    this.showConfirm(code, param);
  }

  warning(): void {
    this.modalService.warning({
      nzTitle: '信息提示',
      nzContent: '请选择想要操作的数据(注;类型为2的用户只有二、四季度的自评）'
    });
  }
  // style
  success(): void {
    this.modalService.success({
      nzTitle: '成功！',
      nzContent: '所选人员代办推送成功'
    });
  }

  // style
  delete(): void {
    this.modalService.success({
      nzTitle: '成功！',
      nzContent: '所选人员代办删除成功'
    });
  }

  showConfirm(code: string, param: Array<any>) {
     this.modalService.confirm({
      nzTitle  : '<i>删除确认</i>',
      nzContent: '<b>你确认要删除所选待办?</b>',
      nzOnOk   : () => {
        // @ts-ignore
        this.dataSource.deleteVirtRecord(JSON.stringify(param)).subscribe(data => {
          if ( data > 0) {
            this.delete();
            this.loadData();
          }
        });
      }
    });
  }
  resetForm(): void {
    this.filed1 = '';
    this.filed2 = '';
  }
  // query
  selectByCondition(): string {
    if ( !this.flag) {
      this.tableSource = this.dataSource.dataStatus.anyData;
      this.flag = true ;
    } else {
      this.dataSource.dataStatus.anyData = this.tableSource;
    }
      // @ts-ignore
    this.dataSource.dataStatus.anyData = this.dataSource.dataStatus.anyData.filter( item => {
      // if ((item.employeeName.indexOf(this.filed1 == null ? '' : this.filed1) > -1) && (item.employeeCode .indexOf( this.filed2 == null ? '' : this.filed2) > -1)) {
      //   return true;
      // } else if (item.employeeName.indexOf(this.filed1 == null ? '' : this.filed1) > -1) {
      //   return true;
      // } else if (item.employeeCode .indexOf( this.filed2 == null ? '' : this.filed2) > -1) {
      //   return true;
      // }

      if(this.filed1 != ''&&this.filed2!= ''&&this.filed2!=null&&this.filed1!=null){
        if ((item.employeeName.indexOf(this.filed1) > -1) && (item.employeeCode .indexOf( this.filed2) > -1)){
          return true;
        }else{
          return false
        }
      }else if(this.filed1 != ''&&this.filed1 != null){
        if (item.employeeName.indexOf(this.filed1) > -1) {
          return true;
        }else{
          return false
        }
      }else if(this.filed2 != ''&&this.filed2 != null){
          if (item.employeeCode.indexOf(this.filed2) > -1) {
            return true;
          }else{
            return false
          }
      }else {
        return true;
      }
    })
    return null;
  }

  search(event) {
    if (event.keyCode == 13) {
      this.selectByCondition();
    }
  }
}

class TempEntity {
  private employeeCode: string;
  private code: string;

  getEmployeeCode(): string {
    return this.employeeCode;
  }

  setEmployeeCode(instanceId: string) {
    this.employeeCode = instanceId;
  }

  getCode(): string {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }
}
