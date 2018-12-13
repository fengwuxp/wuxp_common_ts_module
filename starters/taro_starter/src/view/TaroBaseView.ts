import * as Taro from "@tarojs/taro";
import {BaseAppView} from "common_view/src/BaseAppView";
import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import {TaroNavigatorAdapter} from "common_route/src/adapter/taro/TaroNavigatorAdapter";


/**
 * 抽象一个基础的视图
 */
export default abstract class TaroBaseView<P, S> extends Taro.Component<P, S> implements BaseAppView<any, any> {


    //导航器
    protected navigator: NavigatorAdapter = new TaroNavigatorAdapter();



    backView = () => this.navigator.goBack();

    pushView = (pathname: string, state: object) => this.navigator.push({pathname, state});

    redirectView = (pathname: string, state: object) => this.navigator.redirect({pathname, state});




}