import { PageInfo } from "src/app/entity/PageInfo";
import { EvalMgrYear } from "src/app/entity/EvalMgrYear";

export class PageData{
    pageInfo:PageInfo;
    selectLists:Map<string,Array<any>>
    listData:Array<any>;
}