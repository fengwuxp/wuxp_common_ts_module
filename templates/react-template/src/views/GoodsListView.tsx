import * as React from "react";
import {ReactRouteView} from "common_state/src/annotations/ReactRouteView";
import goodsListDataProvider from "../provider/GoodsListDataProvider";


export interface GoodsListViewProps {

    goodsList: Array<{}>;
}

interface GoodsListViewState {

}

@ReactRouteView({
    pathname: "goods_list"
})
export default class GoodsListView extends React.Component<GoodsListViewProps, GoodsListViewState> {


    constructor(props: Readonly<GoodsListViewProps>) {
        super(props);

        setTimeout(() => {
            goodsListDataProvider.queryGoodsList();
        }, 1000);

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {goodsList} = this.props;

        return <div>
            {JSON.stringify(goodsList)}
        </div>
    }

    //@Aut({
    //   con:"'
    // })
    add = () => {

    }
}