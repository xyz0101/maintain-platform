export class EvalMgrYear{
      employeeCode:string;
      employeeLevel :string;
      employeeName:string;
      mgrCode:string;
      mgrName:string;
      orgFullName:string;
      statu:string;
      firstSubmit:string;
      evalYear:string;
      levelFirst:string;
      isUnSubmit:boolean;
      constructor(){

      }
      public  getKey(value:any) : string{
   
            return value.employeeCode+""+value.employeeLevel+""+
            value.employeeName+""+value.mgrCode+""+
            value.mgrName+""+value.orgFullName+""+
            value.statu+""+value.firstSubmit+""+
            value.evalYear+""+value.levelFirst+""+value.isUnSubmit+"";
       }

}