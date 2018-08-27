import {PagingQueryView} from "common_view/src/PagingQueryView";


export default abstract class ReactSimpleQueryView implements PagingQueryView {




    onRefreshEventHandle: () => (Promise<any> | void);


    nextPage: (...args) => any;





}