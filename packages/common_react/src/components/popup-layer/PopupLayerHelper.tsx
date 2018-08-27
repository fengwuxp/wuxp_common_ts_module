import ReactDOM from "react-dom";
import * as React from "react";
import {PopupModel} from "./PopupModel";
import PopupLayer, {PopupLayerProps, wrapperComponentToPopupLayer} from "./PopupLayer";


/**
 * 通用弹出层处理
 *
 * 期望：1、包装任意组件，使其弹出
 *      2、 弹出模式支持 替换当前、覆盖当前、按照顺序
 *      3、 关闭模式支持 自动关闭（超时）,手动关闭，或者是二者组合
 *
 *
 * 实现思路：1、使用一个队列保存待显示的弹出层
 *          2、 显示策略：遍历队列，判断每一个弹出层的弹出模式、如果是自动关闭类型的 在显示后需要设置一个定时器，
 *          如果是组合关闭类型的在关闭后还要移除定时器
 *
 */


export interface PopupLayerHolder {

    destroy: () => void;
}

const popupLayerList: PopupLayer[] = [];
const propsList: PopupLayerProps[] = [];
const layerId = "___popup___up___layer___";

export default class PopupLayerHelper {


    private static isRender: boolean = false;

    /**
     * 弹出层计数器
     */
    private static count = 0;

    private static wrapper; //PopupLayerWrapper|React.ReactElement<PopupLayerWrapper>;

    private static container: HTMLElement;

    /**
     * 弹出一个 Layer
     * @param content
     * @param props
     */
    public static popup = (content: React.ReactNode, props: PopupLayerProps = {
        model: PopupModel.REPLACE
    }): PopupLayerHolder => {

        if (content == null) {
            return;
        }

        // PopupLayerHelper.count++;


        let container: HTMLElement = null;

        //容器

        container = document.getElementById(layerId);
        if (container == null) {
            container = document.createElement('div');
            container.setAttribute("id", layerId);
            document.body.appendChild(container);
            PopupLayerHelper.container = container;
        }
        const {model} = props;
        let isOverFlow = model === PopupModel.OVERFLOW;
        const popupLayer = wrapperComponentToPopupLayer<PopupLayerProps>(content);
        if (isOverFlow) {
            //覆盖
            popupLayerList.unshift(popupLayer);
            propsList.unshift(props)
        } else if (model === PopupModel.REPLACE) {
            //替换
            popupLayerList[0] = popupLayer;
            propsList[0] = props;
        } else {
            //顺序展示
            popupLayerList.push(popupLayer);
            propsList.push(props)
        }

        //渲染
        let layer = renderPopupLayer();
        ReactDOM.render(layer as any, container);


        return {
            destroy: () => {
                layer.close()
            },
        };
    };

    public static close() {

        let container = PopupLayerHelper.container;
        const unmountResult = ReactDOM.unmountComponentAtNode(container);
        if (unmountResult && container.parentNode) {
            //移除所有
            container.parentNode.removeChild(container);
        }
    }
}

function renderPopupLayer(): PopupLayer {

    //用于只展示第一个
    const PopupLayer: any = popupLayerList[0];

    return <PopupLayer {...propsList[0]}/> as any
}