 import {WrapperDataProvider} from "fengwuxp_common_state/src/annotations/BrowserRouteEventDataProvider";
import {DataProvider} from "fengwuxp_common_state/src/provider/DataProvider";
import {GoodsListViewProps} from "../views/GoodsListView";
import {StateType} from "fengwuxp_common_state/src/provider/DataProvider";


@WrapperDataProvider({})
class GoodsListDataProvider implements DataProvider<GoodsListViewProps> {

    setState: <K extends keyof GoodsListViewProps>(state: StateType<GoodsListViewProps, K>) => void;


    defaultState = <K extends keyof GoodsListViewProps>() => {
        return {
            goodsList: []
        }
    };

    queryGoodsList = () => {

        return [
            {name: "123"},
            {name: "456"},
        ]
    }
}

const goodsListDataProvider = new GoodsListDataProvider();


export default goodsListDataProvider;