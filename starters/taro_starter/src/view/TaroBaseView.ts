import * as Taro from "@tarojs/taro";
import {BaseAppView} from "fengwuxp_common_view/src/BaseAppView";
import TaroAppRouterHelper from "../route/TaroAppRouterHelper";


/**
 * 抽象一个基础的视图
 * Taro 不支持 坑...
 */
export default abstract class TaroBaseView<P, S> extends Taro.Component<P, S> implements BaseAppView<any, any> {


    constructor(props: P, context: any) {
        super(props, context);
    }

    backView = TaroAppRouterHelper.backView;

    pushView = TaroAppRouterHelper.toView;

    redirectView = TaroAppRouterHelper.redirectView;


}