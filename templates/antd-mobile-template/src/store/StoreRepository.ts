import AbstractStoreRepository from "common_redux/src/store/AbstractStoreRepository";
import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import rootReducer from '../reducers/index';
import rootEpic from '../epics/index';
import {History} from "history";
import {AntdMobileStore} from "./AntdMobileStore";


/**
 * store repository
 */
class StoreRepository extends AbstractStoreRepository<AntdMobileStore> {

    constructor() {
        super();
    }

    /**
     * 初始化store
     * @param history
     */
    init = (history: History) => {

        //epic 中间件
        const epicMiddleware = createEpicMiddleware();

        //组合中间件
        const middleware = applyMiddleware(
            epicMiddleware,
            routerMiddleware(history)
        );

        this.store = createStore(
            connectRouter(history)(rootReducer),
            composeWithDevTools(middleware)
        );
        epicMiddleware.run(rootEpic as any);
        return this.store
    };
}
console.log("------------------")
const storeRepository = new StoreRepository();
console.log("------------------",storeRepository);
export default storeRepository;




