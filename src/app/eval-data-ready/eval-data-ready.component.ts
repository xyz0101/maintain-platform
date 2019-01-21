import { Component, OnInit } from '@angular/core';
import { MyComponent } from 'src/app/comps/MyComponent';
import { NzModalService, UploadFile, UploadFilter, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { EvalServiceService } from 'src/app/eval-service.service';
import { FormBuilder } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-eval-data-ready',
  templateUrl: './eval-data-ready.component.html',
  styleUrls: ['./eval-data-ready.component.css']
})
export class EvalDataReadyComponent implements    OnInit{

  current = 0;
  displayData = [];
 
  //搜索条件
  searchValue = '';
 //注入路由信息,以及评价的服务
 constructor( public routerInfo:ActivatedRoute,public evalService:EvalServiceService ,public fb: FormBuilder,
  public modalService: NzModalService,private msg: NzMessageService,private router:Router) { 
    
}

  ngOnInit() {
   
  }
 

  /**
   * 上一步
   */
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }
  /**
   * 下一步
   */
  next(): void {
    this.current += 1;
    this.changeContent();
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
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.router.navigateByUrl("/evaluate/ready")
        
        break;
      }
      case 1: {
          this.router.navigateByUrl("/evaluate/ready/stepsecond")
       
        break;
      }
      case 2: {
      
        break;
      }
      case 3: {
   
        break;
      }
      case 4: {
      
        break;
      }
      
      default: {
       
      }
    }
  }



 }




