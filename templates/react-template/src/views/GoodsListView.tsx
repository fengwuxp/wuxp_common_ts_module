import * as React from "react";
import {ReactRouteView} from "fengwuxp_common_state/src/annotations/ReactRouteView";
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

    componentDidMount(): void {

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {goodsList} = this.props;

        return <div>
            {JSON.stringify(goodsList)}
            <form action={"/index"} method="post">
                <input name="name" defaultValue="李四"/>
                <button type={"submit"}>提交数据</button>
            </form>
            <button onClick={this.testFetch}>发起fetch请求</button>
        </div>
    }

    private testFetch = () => {
        const data = {
            name: "张三"
        };
        fetch("/index", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
    };


    //@Aut({
    //   con:"'
    // })
    add = () => {

    }
}