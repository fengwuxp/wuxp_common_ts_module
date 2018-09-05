import * as React from "react";
import {TabBar, Toast} from "antd-mobile";
import {NAV_ITEMS} from "../config/IndexNavConfig";
import {connect, MapStateToPropsParam} from "react-redux";
import {parse} from "querystring";
import {AntdMobileStore} from "../store/AntdMobileStore";
import {navReducerHolder} from "../reducers/index/IndexNavReducerHolder";
import {reduxRouterHandler} from "common_redux/src/router/ReduxRouterHandler";


export interface IndexNavViewProps {

    selectedIndex: number;

}

interface IndexNavViewState {

}


const mapStateToPropsParam: MapStateToPropsParam<IndexNavViewProps, IndexNavViewProps, AntdMobileStore> = ({indexNavProps}) => ({

    ...indexNavProps
});

/*
* 入口导航页面
* */
@(connect as any)(mapStateToPropsParam)
export default class IndexNavView extends React.Component<IndexNavViewProps, IndexNavViewState> {


    constructor(props: any, context: any) {
        super(props, context);

        //获取url参数
        const {search} = location;
        const params: any = parse(search.replace("?", ""));
        const selectedIndex: number = params.selectedIndex;
        if (selectedIndex != null && /\d/.test(selectedIndex + "")) {
            //设置selectedIndex
            navReducerHolder.setProps({selectedIndex});
        }
    }

    state = {};

    componentDidMount() {
    }

    render(): React.ReactNode {

        return this.renderWxIndex();
    }

    /**
     * 渲染微信浏览器的首页
     * @return {React.ReactNode}
     */
    renderWxIndex = (): React.ReactNode => {
        const {selectedIndex} = this.props;

        return <TabBar barTintColor={"rgba(255, 255, 255, 0.4)"}>
            {
                NAV_ITEMS.map((itemProps, i) =>
                    <TabBar.Item
                        key={i}
                        {...itemProps}
                        selected={i === selectedIndex}
                        onPress={() => {
                            if (i === 2) {
                                //TODO 到的登录页面
                                // reduxRouterHandler.push("")
                            } else {

                            }
                            navReducerHolder.setProps({selectedIndex: i});
                        }}/>
                )
            }
        </TabBar>;

    };

}
