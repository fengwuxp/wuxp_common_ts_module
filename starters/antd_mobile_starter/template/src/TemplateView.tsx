import * as  React from "react";
import {Flex, Modal, Toast, WingBlank} from "antd-mobile";
import {connect, MapStateToPropsParam} from "react-redux";
import {AntdMobileStore} from "./store/AntdMobileStore";
import AntdAbstractView, {AntdAbstractViewProps,AntdAbstractViewState} from "antd_mobile_starter/src/layouts/view/AntdAbstractView";
import utilLess from "antd_mobile_starter/src/less/utils.module.less";
import classNames from "classnames";

export interface TemplateViewProps extends AntdAbstractViewProps {


}

interface TemplateViewState extends AntdAbstractViewState {


}

const mapStateToPropsParam: MapStateToPropsParam<any, TemplateViewProps, AntdMobileStore> = ({}) => ({

});


/**
 * 模板页面
 */
@(connect as any)(mapStateToPropsParam)
export default class TemplateView extends AntdAbstractView<TemplateViewProps, TemplateViewState> {


    constructor(props: any, context: any) {
        super(props, context);
    }


    state:TemplateViewState = {

    };

    componentDidMount() {

    }



    renderBody = () => {



        return <div></div>
    };

}
