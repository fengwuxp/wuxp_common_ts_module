import * as React from "react";
// import {TabBar, Toast} from "antd-mobile";
import {connect, MapStateToPropsParam} from "react-redux";
import {parse} from "querystring";
import {AntdMobileStore} from "../store/AntdMobileStore";
import {reduxRouterHandler} from "fengwuxp_common_redux/src/router/ReduxRouterHandler";


export interface IndexNavViewProps {

    selectedIndex: number;

}

interface IndexNavViewState {

}


// const mapStateToPropsParam: MapStateToPropsParam<IndexNavViewProps, IndexNavViewProps, AntdMobileStore> = () => ({});

/*
* 入口导航页面
* */
// @(connect as any)(mapStateToPropsParam)
export default class IndexNavView extends React.Component<IndexNavViewProps, IndexNavViewState> {


    constructor(props: any, context: any) {
        super(props, context);

        //获取url参数
        const {search} = location;
        const params: any = parse(search.replace("?", ""));
        const selectedIndex: number = params.selectedIndex;
        if (selectedIndex != null && /\d/.test(selectedIndex + "")) {
            //设置selectedIndex
            // navReducerHolder.setProps({selectedIndex});
        }
    }

    state = {};

    componentDidMount() {
    }

    render(): React.ReactNode {

        return null;
    }


}
