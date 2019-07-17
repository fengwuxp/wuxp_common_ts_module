import {PagingQueryView} from "fengwuxp_common_view/src/PagingQueryView";


export default abstract class ReactSimpleQueryView implements PagingQueryView {




    onRefreshEventHandle: () => (Promise<any> | void);


    nextPage: (...args) => any;





}