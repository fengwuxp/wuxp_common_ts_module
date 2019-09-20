import * as  React from "react";
import {Flex, Modal, Toast, WingBlank, Carousel, NoticeBar} from "antd-mobile";
import {connect, MapStateToPropsParam} from "react-redux";
import {AntdMobileStore} from "../store/AntdMobileStore";
import AntdAbstractView, {
    AntdAbstractViewProps,
    AntdAbstractViewState
} from "antd_mobile_starter/src/layouts/view/AntdAbstractView";
import classNames from "classnames"
import styles from "./style.module.less";
import utilLess from "starters/antd_mobile_starter/src/less/utils.module.less";
import fontLess from "antd_mobile_starter/src/less/font.module.less";
import {indexRouteName} from "./index";

export interface HomeViewProps extends AntdAbstractViewProps {



}

interface HomeViewState extends AntdAbstractViewState {


}

const mapStateToPropsParam: MapStateToPropsParam<any, HomeViewProps, AntdMobileStore> = () => ({});


/**
 * 首页
 */
@(connect as any)(mapStateToPropsParam)
export default class HomeView extends AntdAbstractView<HomeViewProps, HomeViewState> {


    constructor(props: any, context: any) {
        super(props, context);
    }


    state: HomeViewState = {};

    componentDidMount() {

    }




    renderBody = () => {

        const {} = this.props;


        return <section className={utilLess.view_body_scroll}>index</section>
    };




}
