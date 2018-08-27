import * as React from "react";
import {PopupModel} from "./PopupModel";
import "./style.less";

export interface PopupLayerProps {

    model: PopupModel;

    /**
     * 超时关闭的时间，单位毫秒
     */
    timeOut?: number;
}

export interface PopupLayerState {

    showPopupLayer: boolean
}

export interface PopupLayerNode {

    /**
     * 设置 节点被关闭的时候的回调
     * @param callback
     */
    setDestroyCallback: (callback: () => void) => void;
}

/**
 * 弹出层
 */
export default class PopupLayer<P extends PopupLayerProps = PopupLayerProps, S extends PopupLayerState = PopupLayerState>
    extends React.Component<P, S>
    implements PopupLayerNode {

    public static wrapperStyle: React.CSSProperties;


    protected destroyCallback: Function;


    protected timerId;

    constructor(props: P, context: any) {
        super(props, context);
        if (this.props.timeOut) {
            //注册自动关闭
            this.timerId = setTimeout(() => {
                this.close();
            }, this.props.timeOut)
        }
    }


    setDestroyCallback = (callback: Function) => {
        this.destroyCallback = callback;
    };


    public close = () => {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.setState({
            showPopupLayer: false
        });
    };

}


export function wrapperComponentToPopupLayer<P extends PopupLayerProps = PopupLayerProps,
    S extends PopupLayerState = PopupLayerState, C extends keyof PopupLayer<P, S> = any>(node: React.ReactNode): C {


    class Wrapper extends PopupLayer<P, S> {

        constructor(props: P, context: any) {
            super(props, context);
        }

        state: any = {
            showPopupLayer: true
        };

        render() {
            const {showPopupLayer} = this.state;
            return showPopupLayer ?
                <div className={"__popup_layer__"} style={PopupLayer.wrapperStyle} children={node}/> : null;
        }
    }

    return Wrapper as any;

}