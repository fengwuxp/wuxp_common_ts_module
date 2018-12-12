import {createElement, render, Component} from 'rax';
import {BaseAppView} from "../../../../packages/common_view/src/BaseAppView";
import {SendMessageView} from "common_view/src/broadcast/SendMessageView";
import {ReceiveMessageView} from "common_view/src/broadcast/ReceiveMessageView";
import * as React from "react";


/**
 * 抽象的raxView
 */
export default abstract class AbstractSimpleRaxView<P, S> extends Component<P, S> implements BaseAppView<React.ReactNode>, SendMessageView, ReceiveMessageView {


    abstract renderBody: () => React.ReactNode;

    abstract renderFooter?: () => React.ReactNode;

    abstract renderHeader?: () => React.ReactNode;

    abstract onMessage: (type: string, data: any) => void;

    abstract sendMessage: (type: string, data: any) => void;

    render() {

        return <div style={{flex: 1, width: 750, flexDirection: "column"}}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
        </div>
    }


}