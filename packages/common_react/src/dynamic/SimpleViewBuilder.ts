
import {ViewBuilder} from "./ViewBuilder";
import ReactDOM from "react-dom";
import {DOMAttributes, DOMElement} from "react";
import {unMountComponentByNode} from "./Utils";

/**
 * 简单的动态视图构建者
 * @author wxup
 * @create 2018-09-09 21:59
 **/
export default class SimpleViewBuilder implements ViewBuilder {

    protected container: HTMLElement;


    constructor(container?: HTMLElement) {
        if (container == null) {
            this.container = document.createElement("div");
            document.body.appendChild(container);
        } else {
            this.container = container;
        }

    }

    mount = (node: DOMElement<DOMAttributes<any>, any>) => {
        ReactDOM.render(node, this.container);
    };


    unMount = () => {
        unMountComponentByNode(this.container);
    };


}
