import {BaseAppView} from "fengwuxp_common_view/src/SimpleView";
import * as React from "react";
import {ErrorInfo} from "react";
import FlexView from "../components/FlexView";


export interface ReactSimpleViewProps {

}

export interface ReactSimpleViewState {

    viewRootStyle?: React.CSSProperties;
}

const viewBuilderStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1
};

/**
 * react simple view
 */
export default abstract class ReactSimpleView<P extends ReactSimpleViewProps, S extends ReactSimpleViewState>
    extends React.Component<P, S>
    implements BaseAppView<React.ReactNode> {


    state: S;

    constructor(props: P, context: any) {
        super(props, context);
    }


    renderBody = (): React.ReactNode => null;

    renderFooter = (): React.ReactNode => null;

    renderHeader = (): React.ReactNode => null;


    render() {

        return this.renderContent();
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {

        //统一异常捕获

        console.error("-------error-----", error);
        console.error("-------errorInfo-----", errorInfo)
    }

    /**
     * 组件被销毁钱调用
     */
    componentWillUnmount() {


    }

    /**
     * 返回
     * @type {() => any}
     */
    abstract goBack: () => void;

    /**
     * 跳转到某个视图
     */
    abstract to: (...args) => void;


    /**
     * 渲染一个包装层，可以吧body包装起来
     * @param {React.ReactNode} children
     * @return {React.ReactNode}
     */
    protected renderWrapper = (children: React.ReactNode) => children;


    /**
     * 渲染页面内容
     * @return {React.ReactNode}
     */
    private renderContent = () => <FlexView key={`${ReactSimpleView.name}_flex_view`}
                                            style={Object.assign({}, viewBuilderStyle,this.state.viewRootStyle)}
                                            className={"react_view_root"}
                                            header={this.renderHeader()}
                                            footer={this.renderFooter()}>{this.renderWrapper(this.renderBody())}</FlexView>
}