export class PageInfo{
      pageNum :number;
      totalNum:number;
      curPage :number;
      pageSize:number;
      // public PageInfo(){

      // }
      constructor (curPage,pageSize){
            this.curPage = curPage;
            this.pageSize = pageSize;
      }
}