import * as React from "react";
import {MouseEventHandler} from "react";
import {isFunction} from "util";


export interface MaskLayerProps {

    style?: React.CSSProperties;

    className?: string;

    onClick?: MouseEventHandler<any>;
}

interface MaskLayerState {

}

const defaultStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.4)"
};

/**
 * 遮罩层 组件
 * @author wxup
 * @create 2018-07-20 14:42
 **/
export default class MaskLayer extends React.Component<MaskLayerProps, MaskLayerState> {

    private el;

    state = {};

    render() {

        const {children, onClick, className, style} = this.props;

        return <div className={className}
                    ref={el => this.el = el}
                    onClick={(event) => {
                        const target = event.target;
                        //判断事件来源，防止事件冒泡
                        if (target !== this.el) {
                            return;
                        }
                        if (isFunction(onClick)) {
                            onClick(event);
                        }
                    }}
                    style={{
                        ...defaultStyle,
                        ...style
                    }}>{children}</div>
    }
}
