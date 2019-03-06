import { PageInfo } from "src/app/entity/PageInfo";
import { BehaviorSubject } from "rxjs";
import { PageData } from "src/app/entity/PageData";
/**
 * 保存后台获取的数据以及状态
 */
export class DataStatus {
    public evalMgrSubject = new BehaviorSubject<any[]>([]);
    public tableData = new Array<any>();
    public anyData =new Object();
    public loadingEvalSubject = new BehaviorSubject<boolean>(false);
    public pageInfo = new PageInfo(1,13);
    
    public pageDate = new PageData();
    public loading$ = this.loadingEvalSubject.asObservable();
    public length: number;
    public rtnObj: any;
     public mapData =new  Map<string,any>();
}
