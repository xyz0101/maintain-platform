import { PageInfo } from "src/app/entity/PageInfo";
import { BehaviorSubject } from "rxjs";

export class DataStatus{
    public evalMgrSubject = new BehaviorSubject<any[]>([]);
    public myData = new Array<any>();
    public loadingEvalSubject = new BehaviorSubject<boolean>(false);
    public pageInfo = new PageInfo();
    public loading$ = this.loadingEvalSubject.asObservable();
    public length:number;
}