 
 
import { ReadyStepSecondComponent } from "src/app/eval-data-ready-sub/ready-step-second/ready-step-second.component";
import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
@Injectable()
export class RouterGuard implements CanDeactivate<any>{
    canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.log("开始")
        if(this.checkEmpty(component.addUIList)&&this.checkEmpty(component.addUIList1)
         &&this.checkEmpty(component.updateList)&&this.checkEmpty(component.updateList1)
         &&this.checkEmpty(component.deleteList)&&this.checkEmpty(component.deleteList1)){

             console.log("通过了")
             
             return true;
         }else{
              
             component.error("您还没有保存，请先保存现有更改！")
              return false;
         }
    }
   

    checkEmpty(list:any):boolean{
        if(list==undefined||list==null|| list.length==0  ){
            return true;
        }
    }

}